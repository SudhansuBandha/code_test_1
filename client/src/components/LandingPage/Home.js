import Login from "./Login";
import Logo from "./Logo";
import React from "react";
import styled from "styled-components";
function Home() {
  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Login />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;
const Left = styled.div`
  @media (max-width: 760px) {
    display: none;
  }
`;
export default Home;
