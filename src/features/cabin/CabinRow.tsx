import styled from "styled-components";
import type { Cabin } from "./types";
import { formatCurrency } from "../../utils/formatter";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import FlexRow from "../../ui/FlexRow";
import useDeleteCabinMutation from "./hooks/useDeleteCabinMutation";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabinMutation from "./hooks/useCreateCabinMutation";

interface CabinRowProps {
  cabin: Cabin;
}

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr repeat(3, 1fr);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-family: "Sono", monospace;
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

const Capacity = styled.div`
  font-family: "Sono", monospace;
  font-weight: 500;
`;

const Price = styled.div`
  font-family: "Sono", monospace;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", monospace;
  font-weight: 500;
  color: var(--color-grey-700);
`;
export default function CabinRow({ cabin }: CabinRowProps) {
  const [showForm, setShowForm] = useState(false);
  const {
    image,
    cabin_name: cabinName,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
    cabin_id: cabinId,
  } = cabin;

  const { isDeletePending, deleteMutationFn } = useDeleteCabinMutation();
  const { isCreatePending, createMutationFn } = useCreateCabinMutation();

  function handleDuplicate() {
    createMutationFn({
      cabin_name: `Copy of ${cabin.cabin_name}`,
      max_capacity: maxCapacity,
      discount,
      regular_price: regularPrice,
      image: cabin.image,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image || ""} alt={`${cabinName}`} />
        <Cabin>{cabinName}</Cabin>
        <Capacity>{`Fits up to ${maxCapacity} guests`}</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount !== 0 ? (
          <Discount>{formatCurrency(discount || 0)}</Discount>
        ) : (
          <div>&mdash;</div>
        )}
        <FlexRow>
          <Button
            variation="secondary"
            disabled={isCreatePending}
            onClick={handleDuplicate}
          >
            <HiSquare2Stack />
          </Button>
          <Button onClick={() => setShowForm((s) => !s)} variation="secondary">
            <HiPencil />
          </Button>
          <Button
            variation="danger"
            disabled={isDeletePending}
            onClick={() => deleteMutationFn(cabinId)}
          >
            <HiTrash />
          </Button>
        </FlexRow>
      </TableRow>
      {showForm && <CreateCabinForm cabin={cabin} />}
    </>
  );
}
