import {
  createContext,
  useContext,
  useState,
  type JSX,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

interface ModalContextProps {
  modalId: string;
  openModal: (id: string) => void;
  closeModal: () => void;
}
// 1. create a context
const ModelContext = createContext<ModalContextProps | null>(null);

// 1(a). create use modal context
function useModalContext() {
  const context = useContext(ModelContext);
  if (context === undefined || context === null) {
    throw new Error("Model Context was used outside of Parent");
  }
  return context;
}

// 2. create parent component
function Modal({ children }: PropsWithChildren) {
  const [modalId, setModalId] = useState("");
  const closeModal = () => setModalId("");
  const openModal = (id: string) => setModalId(id);
  return (
    <ModelContext.Provider value={{ modalId, openModal, closeModal }}>
      {children}
    </ModelContext.Provider>
  );
}

// 3 create child compoents
// 3 (a). create Open Child Component which used to open the model
interface OpenProps {
  render: (a: (id: string) => void) => JSX.Element;
}
function Open({ render }: OpenProps) {
  const { openModal } = useModalContext();
  return render(openModal);
}

// 3.(b) create Window Child Component which render the children in a modal
interface WindowProps {
  render: (a: () => void) => JSX.Element;
  modalId: string;
}
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-grey-0);
  padding: 2.4rem 4rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;

  backdrop-filter: blur(4px);
  background-color: var(--backdrop-color);
  transition: all 0.3s;
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 2rem;
  right: 2rem;
  transition: all 0.3s;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;
function Window({ render, modalId: windowId }: WindowProps) {
  const { closeModal, modalId } = useModalContext();
  if (modalId !== windowId) return;
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        <div>{render(closeModal)}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4. Add chilc components as properties to parent
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
