import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../../services/apiCabins";

export default function useCabinQuery() {
  const {
    data: cabins = [],
    isPending: isPendingCabins,
    error,
  } = useQuery({
    queryKey: ["cabin/getAll"],
    queryFn: getAllCabins,
  });

  return { cabins, isPendingCabins, error };
}
