/* eslint-disable react/prop-types */
import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled(motion.aside)`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 26rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  margin-top: 6rem;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 3.2rem 1.6rem;
  }
`;

function Sidebar({ toggleSidebar }) {
  return (
    <StyledSidebar
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Logo />
      <MainNav toggleSidebar={toggleSidebar} />
    </StyledSidebar>
  );
}

export default Sidebar;
