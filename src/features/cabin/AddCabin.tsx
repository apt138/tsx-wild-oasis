import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <div>
        <Modal.Open
          render={(openModal) => (
            <Button onClick={() => openModal("add-cabin")}>Add Cabin</Button>
          )}
        ></Modal.Open>
      </div>
      <Modal.Window
        modalId="add-cabin"
        render={(onClose) => <CreateCabinForm onCloseModal={onClose} />}
      ></Modal.Window>
    </Modal>
  );
}
