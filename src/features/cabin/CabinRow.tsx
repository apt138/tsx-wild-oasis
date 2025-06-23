import styled from "styled-components";
import type { Cabin } from "./types";
import { formatCurrency } from "../../utils/formatter";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import FlexRow from "../../ui/FlexRow";
import useDeleteCabinMutation from "./hooks/useDeleteCabinMutation";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabinMutation from "./hooks/useCreateCabinMutation";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

interface CabinRowProps {
  cabin: Cabin;
}

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
    <Table.Row>
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
        <Modal>
          <Modal.Open
            render={(onClick) => (
              <Button
                onClick={() => onClick("edit-cabin")}
                variation="secondary"
              >
                <HiPencil />
              </Button>
            )}
          />
          <Modal.Window
            modalId="edit-cabin"
            render={(onClose) => (
              <CreateCabinForm onCloseModal={onClose} cabin={cabin} />
            )}
          />

          <Modal.Open
            render={(onClick) => (
              <Button
                variation="danger"
                disabled={isDeletePending}
                onClick={() => onClick("delete-cabin")}
              >
                <HiTrash />
              </Button>
            )}
          />
          <Modal.Window
            modalId="delete-cabin"
            render={(onClose) => (
              <ConfirmDelete
                resource="Cabin"
                id={cabinName}
                onCloseModal={onClose}
                onConfirm={() => deleteMutationFn(cabinId)}
              />
            )}
          />
        </Modal>
      </FlexRow>
    </Table.Row>
  );
}
