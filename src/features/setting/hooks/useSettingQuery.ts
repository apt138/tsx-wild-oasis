import { useQuery } from "@tanstack/react-query";
import { getAllSettings } from "../../../services/apiSettings";

export default function useSettingQuery() {
  const {
    data: settings,
    isPending: isLoadingSettings,
    error,
  } = useQuery({ queryKey: ["setting/getAll"], queryFn: getAllSettings });

  return { settings, isLoadingSettings, error };
}
