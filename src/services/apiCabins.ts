import type { Cabin, InsertCabin } from "../features/cabin/types";
import { uploadFile } from "./apiBuckets";
import { supabase } from "./supabase";

export async function getAllCabins() {
  const { data: wo_cabins, error } = await supabase
    .from("wo_cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Error while fetching cabins data from supabase");
  }
  return wo_cabins;
}

export async function deleteCabin(cabin_id: number) {
  const { error } = await supabase
    .from("wo_cabins")
    .delete()
    .eq("cabin_id", cabin_id);

  if (error) {
    console.error(error);
    throw new Error(`Error while deleting the cabin with id: ${cabin_id}`);
  }
}

export async function createCabin(cabin: InsertCabin) {
  // 1. try to upload the file
  let imagePath: string = cabin.image;
  const isImageExist =
    typeof cabin.image === "string" &&
    cabin.image.startsWith(import.meta.env.VITE_SUPABASE_URL);
  if (!isImageExist) {
    const file = cabin.image[0] as unknown as File;
    try {
      const { fullPath } = await uploadFile(
        "wo-images",
        file,
        `${Date.now()}-${file.name.replaceAll("/", "")}`
      );
      imagePath = fullPath;
    } catch {
      // 2.(a) if file upload fails, don't proceed further with cabin creation
      // early return
      throw new Error(
        "Errow while creating new cabin. File upload may not be successful"
      );
    }
  }
  // 2.(b) if file uploads success, proceed with cabin creation
  const { data, error } = await supabase
    .from("wo_cabins")
    .insert([
      {
        ...cabin,
        image: isImageExist
          ? imagePath
          : `${
              import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/${imagePath}`,
      },
    ])
    .select()
    .single();
  // 3. Error handling for cabin creation
  if (error) {
    console.error(error);
    throw new Error("Error while creating new cabin.");
  }
  return data;
}

export async function updateCabin(cabin_id: number | undefined, cabin: Cabin) {
  console.log("updateCabin", cabin_id, cabin);
  if (!cabin_id) {
    throw new Error("Error while updating a cabin: cabin_id is undefined");
  }
  console.log("cabin_id is present");
  // 1. If there is a image, do the file upload first.
  // setting the initial value to the path of original image.
  let imagePath = cabin.image;
  // if it is image, then user doesn't attempt to modify the image.
  // if user attempts to modidy, then it will be type of FileList
  const isImageUpdated = !(typeof cabin.image === "string");
  if (isImageUpdated) {
    // case where user tries to modify the image
    const file = cabin.image[0] as unknown as File;
    // try to upload
    try {
      const { fullPath } = await uploadFile(
        "wo-images",
        file,
        `${Date.now()}-${file.name.replaceAll("/", "")}`
      );
      // fullPath will be [buckname]/[file_name]
      imagePath = fullPath;
    } catch {
      // case where image upload fails, then don't attempt to modify the record
      throw new Error(
        `Error while updating cabin: ${cabin_id}. Please check whether file upload is successful`
      );
    }
  }
  // case where either image upload is successful or user doesn't attempt to modify image
  const { data, error } = await supabase
    .from("wo_cabins")
    .update({
      ...cabin,
      updated_at: new Date().toISOString(),
      // conditionally assignment required becoause imagePath either will be fullImageURL
      // or simply [bucket_name]/[file_name]
      image: isImageUpdated
        ? `${
            import.meta.env.VITE_SUPABASE_URL
          }/storage/v1/object/public/${imagePath}`
        : imagePath,
    })
    .eq("cabin_id", cabin_id)
    .select()
    .single();

  // case where update operation is failed, let the user informed
  if (error) {
    console.error("Error while updating a cabin.");
  }
  // case where everything goes well!
  return data;
}
