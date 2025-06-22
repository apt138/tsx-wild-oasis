import FlexBox from "../ui/FlexRow";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabin/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabin/CreateCabinForm";
import Spinner from "../ui/Spinner";
import useCabinQuery from "../features/cabin/hooks/useCabinQuery";

export default function Cabin() {
  const { cabins, isPendingCabins } = useCabinQuery();
  const [showForm, setShowForm] = useState(false);
  if (isPendingCabins) return <Spinner />;

  return (
    <>
      <FlexBox>
        <Heading as="h2">All Cabins</Heading>
        <p>Filter/Sort</p>
      </FlexBox>
      <FlexBox>
        <CabinTable cabins={cabins} />
      </FlexBox>
      <Button
        style={{ width: "80px", textAlign: "center" }}
        onClick={() => setShowForm((s) => !s)}
      >
        Add
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}
