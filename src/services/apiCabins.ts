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
