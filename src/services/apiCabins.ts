import type { InsertCabin } from "../features/cabin/types";
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
  let imagePath: string = "";
  const file = cabin.image[0] as unknown as File;
  try {
    const { fullPath } = await uploadFile(
      "wo-images",
      file,
      `${Date.now()}-${file.name.replaceAll("/", "")}`
    );
    imagePath = fullPath;
  } catch {
    throw new Error("Errow while creating new cabin.");
  }
  const { data, error } = await supabase
    .from("wo_cabins")
    .insert([
      {
        ...cabin,
        image: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/${imagePath}`,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while creating new cabin.");
  }
  return data;
}
