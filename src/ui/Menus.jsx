/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }

  @media (max-width: 768px) {
    position: absolute;
    /* bottom: 0; */
    right: 10%;
    top: 1%;
    /* right: 0; */
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  //keep track which id is opned
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  //use setter functions
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

//calculate the position as soon as the button is clicked
function Toggle({ id }) {
  const { openId, open, close, position, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    //stop propagation to not close the menu
    e.stopPropagation();
    //this rect stands for rectangle and this gets the x and y so we can calculate the position where we want to render the list
    //we need to store it in the parent state
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    //if non of the menus is open then open the one with the given id
    //or if currently an open already but its different from the clicked one then also we want to open it
    //otherwise close it
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, close, position } = useContext(MenusContext);
  //false to not close on click outside the list
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    // create portal as it will float on top of ui
    createPortal(
      <StyledList ref={ref} position={position}>
        {children}
      </StyledList>,
      document.body
    )
  );
}

function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
