/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//step one create context
const ModalContext = createContext();

//step two create parent
function Modal({ children }) {
  //1- Keep track of what is the opened window
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

//3- Create child components that will help implementing the common task overall the Compound component
function Open({ children, opens: opensWindowName }) {
  //to attach the open handler to the children which is in this case button we have to use Clone Element
  const { open } = useContext(ModalContext);

  // return children;
  // we will clone the children element and attach the open handler with new props
  //now we cannot pass this handler function directly to the Button component wich is the child component
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

//we need to use clone element again to pass onClose as a prop as we have styled it as a regular modal
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // //select StyledModal using useRef hook to attach the event listener to it
  // const ref = useRef();

  // // Add a global event listners to close the modal when we click outside it.
  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     //ref.current is the modal istelf and e.target is the child component where the click happened
  //     //if the click happens inside the modal then it wont close as it will return false
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       close();
  //     }
  //   }

  //   //we need to not to listen for this event in bubble phase and listen for it in the capture phase
  //   //as when we try to open this modal it will open it then detect that its outside modal so will close it in the bubble phase
  //   //to do so then set a third argument to true and the event will be handled in the capture phase
  //   // Add the listener when the component mounts
  //   document.addEventListener("click", handleClickOutside, true);

  //   // Remove the listener when the component unmounts
  //   return () =>
  //     document.removeEventListener("click", handleClickOutside, true);
  // }, [close]);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  {
    return createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          {/* <div>{children}</div> */}
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </StyledModal>
      </Overlay>,
      document.body
    );
  }
}

//4- Add child components as properties to the parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
