import styled from "styled-components";
import type { Cabin } from "./types";
import CabinRow from "./CabinRow";

interface CabinTableProps {
  cabins: Cabin[];
}

const Table = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const TableHeader = styled.header`
  text-transform: uppercase;
  font-weight: 600;
  padding: 1.6rem 1.2rem;
  color: var(--color-grey-600);
  letter-spacing: 0.4px;
  background-color: var(--color-grey-50);
  border-bottom: var(--color-grey-100);

  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
  column-gap: 2.4rem;
  align-items: center;
`;

export default function CabinTable({ cabins }: CabinTableProps) {
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.cabin_id} />
      ))}
    </Table>
  );
}
