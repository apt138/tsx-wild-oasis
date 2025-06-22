import type { UpdateSetting } from "../features/setting/types";
import { supabase } from "./supabase";

export async function getAllSettings() {
  const { data: wo_settings, error } = await supabase
    .from("wo_settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error while fetching settings from supabase");
  }

  return wo_settings;
}

export async function updateSetting(newSetting: UpdateSetting) {
  const { data, error } = await supabase
    .from("wo_settings")
    .update(newSetting)
    .eq("setting_id", 1)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while updating setting");
  }

  return data;
}
