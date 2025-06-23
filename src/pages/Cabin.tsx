import FlexBox from "../ui/FlexRow";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabin/CabinTable";
import AddCabin from "../features/cabin/AddCabin";

export default function Cabin() {
  return (
    <>
      <FlexBox>
        <Heading as="h2">All Cabins</Heading>
        <p>Filter/Sort</p>
      </FlexBox>
      <FlexBox>
        <CabinTable />
      </FlexBox>
      <AddCabin />
    </>
  );
}
