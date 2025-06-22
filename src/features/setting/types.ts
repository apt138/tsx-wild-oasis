import type { Database } from "../../types/database.types";

export type Setting = Database["public"]["Tables"]["wo_settings"]["Row"];
export type UpdateSetting =
  Database["public"]["Tables"]["wo_settings"]["Update"];
