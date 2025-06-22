import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../services/apiCabins";
import FlexBox from "../ui/FlexRow";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabin/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabin/CreateCabinForm";

export default function Cabin() {
  const { data: cabins = [], isPending } = useQuery({
    queryKey: ["cabin/getAll"],
    queryFn: getAllCabins,
  });
  const [showForm, setShowForm] = useState(false);
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
