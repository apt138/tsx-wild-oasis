import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../services/apiCabins";
import FlexBox from "../ui/FlexRow";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabin/CabinTable";

export default function Cabin() {
  const { data: cabins = [], isPending } = useQuery({
    queryKey: ["cabin/getAll"],
    queryFn: getAllCabins,
  });
  console.log(cabins);

  if (isPending) return <p>Loading...</p>;

  return (
    <>
      <FlexBox>
        <Heading as="h2">All Cabins</Heading>
        <p>Filter/Sort</p>
      </FlexBox>
      <FlexBox>
        <CabinTable cabins={cabins} />
      </FlexBox>
    </>
  );
}
