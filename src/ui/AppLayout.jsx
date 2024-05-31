import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  transition: margin-left 0.3s ease;
  margin-left: ${(props) => (props.isSidebarOpen ? "26rem" : null)};

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 7rem auto 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3.5rem;
  min-height: 75dvh;

  @media (max-width: 768px) {
    min-height: 100dvh;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <StyledAppLayout>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar key='sidebar' toggleSidebar={toggleSidebar} />
        )}
      </AnimatePresence>
      <Main isSidebarOpen={isSidebarOpen}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
