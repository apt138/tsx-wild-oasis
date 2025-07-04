import { Outlet } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  /* top (left & right) bottom */
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  max-height: 60rem;
`;

const StyledAppLayout = styled.div`
  min-height: 100dvh;

  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: min-content 1fr;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
