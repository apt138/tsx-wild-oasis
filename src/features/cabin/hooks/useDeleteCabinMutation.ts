import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabinMutation() {
  const queryClient = useQueryClient();
  const { isPending: isDeletePending, mutate: deleteMutationFn } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["cabin/getAll"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeletePending, deleteMutationFn };
}
