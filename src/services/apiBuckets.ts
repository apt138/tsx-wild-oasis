import { supabase } from "./supabase";

export async function uploadFile(bucket: string, file: File, fileName: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
  if (error) {
    console.error(error);
    throw new Error(
      `Error while uploading a file: ${fileName} to object storate`
    );
  }
  return data;
}
