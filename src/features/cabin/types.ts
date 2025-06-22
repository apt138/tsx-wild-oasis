import type { Database } from "../../types/database.types";

export type Cabin = Database["public"]["Tables"]["wo_cabins"]["Row"];
export type InsertCabin = Database["public"]["Tables"]["wo_cabins"]["Insert"];
export type UpdateCabin = Database["public"]["Tables"]["wo_cabins"]["Update"];
