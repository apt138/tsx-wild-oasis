import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabinMutation() {
  const queryClient = useQueryClient();
  const { isPending: isCreatePending, mutate: createMutationFn } = useMutation({
    mutationFn: createCabin,
    onSuccess: (data) => {
      toast.success(`Cabin '${data.cabin_name}' created successfully`);
      queryClient.invalidateQueries({ queryKey: ["cabin/getAll"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreatePending, createMutationFn };
}
