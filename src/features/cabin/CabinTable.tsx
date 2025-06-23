import CabinRow from "./CabinRow";
import useCabinQuery from "./hooks/useCabinQuery";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

export default function CabinTable() {
  const { cabins, isPendingCabins } = useCabinQuery();
  if (isPendingCabins) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr repeat(3, 1fr)">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.cabin_id} />
      ))}
    </Table>
  );
}
