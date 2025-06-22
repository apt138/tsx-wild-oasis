import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettingMutation() {
  const queryClient = useQueryClient();
  const { mutate: updateSettingMutationFn, isPending: isUpdateSettingPending } =
    useMutation({
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Settings updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["setting/getAll"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateSettingMutationFn, isUpdateSettingPending };
}
