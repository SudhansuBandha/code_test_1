import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Headline from "./Headline";
import { useGlobalContext } from "../../context/context";

function AdminLandingPage() {
  const { decode } = useGlobalContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(decode());
  }, []);

  return (
    <Container>
      <Headline />
      <Wrapper>
        <h2>Hi {user.username},</h2>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 25px;
  height: calc(100vh - 250px);
  background-color: var(--clr-white);
  display: flex;
  padding: 15px 15px;
`;

export default AdminLandingPage;
