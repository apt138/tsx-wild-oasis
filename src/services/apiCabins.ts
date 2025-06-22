import type { InsertCabin } from "../features/cabin/types";
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
  const { data, error } = await supabase
    .from("wo_cabins")
    .insert([cabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while creating new cabin.");
  }
  return data;
}
