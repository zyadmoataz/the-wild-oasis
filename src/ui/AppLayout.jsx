import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr; //26 for side bar
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Conatiner = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      {/* We placed all outlet inside a main to make all papes have this styles of main */}
      <Main>
        <Conatiner>
          <Outlet />
        </Conatiner>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
