import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../../services/apiCabins";
import type { Cabin } from "../types";
import toast from "react-hot-toast";

interface UpdateMutationFnProps {
  id: number | undefined;
  cabin: Cabin;
}

export default function useUpdateCabinMutation() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatePending, mutate: updateMutationFn } = useMutation({
    mutationFn: ({ id, cabin }: UpdateMutationFnProps) =>
      updateCabin(id, cabin),
    onSuccess: (data) => {
      toast.success(`Cabin '${data?.cabin_name}' updated successfully`);
      queryClient.invalidateQueries({ queryKey: ["cabin/getAll"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdatePending, updateMutationFn };
}
