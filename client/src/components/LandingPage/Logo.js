import React from "react";
import styled from "styled-components";

function Logo() {
  return (
    <Container>
      <Wrapper>
        <h1>careerninja</h1>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    135deg,
    var(--clr-green-1) 5%,
    var(--clr-green-2) 45%
  );
  color: var(--clr-white);
  letter-spacing: 0.2rem;
`;
const Wrapper = styled.div``;

export default Logo;
