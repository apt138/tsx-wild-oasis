import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

interface ConfirmDeleteProps {
  id: number | string;
  resource: string;
  onCloseModal: () => void;
  onConfirm: () => void;
}

const StyledDelete = styled.div`
  width: 40rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    gap: 1.2rem;
    justify-content: end;
  }
`;
export default function ConfirmDelete({
  resource,
  id,
  onCloseModal,
  onConfirm,
}: ConfirmDeleteProps) {
  return (
    <StyledDelete>
      <Heading as="h3">
        Delete {resource}#{id}?
      </Heading>
      <p>
        Are you sure you want to delete this {resource}#{id} permanently?. This
        action cannot be undone.
      </p>
      <div>
        <Button variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledDelete>
  );
}
