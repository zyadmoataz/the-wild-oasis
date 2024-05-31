/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useState } from "react";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1100;
  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 7rem;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 130%;
  left: 0%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 0.5rem;
  padding: 1rem;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 2.2rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

function Header({ toggleSidebar, isSidebarOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledHeader>
      <MenuIcon onClick={toggleSidebar}>
        {isSidebarOpen ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
      </MenuIcon>
      <StyledContainer>
        <UserAvatar onClick={toggleMenu} />
        <DropdownMenu open={isMenuOpen}>
          <HeaderMenu />
        </DropdownMenu>
      </StyledContainer>
    </StyledHeader>
  );
}

export default Header;
