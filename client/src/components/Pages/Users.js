import React, { useEffect, useState } from "react";

import Headline from "./Headline";
import styled from "styled-components";
import axios from "axios";
import { BasicTable } from "../../utils/Table";

function Users() {
  const token = window.localStorage.getItem("token");
  const [data, setData] = useState({});
  const [length, setLength] = useState(0);

  const fetchData = async () => {
    setData(
      await axios.get("/api/auth/users", {
        headers: {
          Authorization: token,
        },
      })
    );

    select();
  };

  const select = () => {
    if (Object.keys(data).length > 0) setLength(Object.keys(data.data).length);
  };

  useEffect(() => {
    fetchData();
    console.log("render");
  }, []);

  if (Object.keys(data).length > 0) {
    return (
      <Container>
        <Headline />
        <Wrapper>
          <BasicTable props={data} />
        </Wrapper>
      </Container>
    );
  }
  return <></>;
}

const Container = styled.div``;

const Wrapper = styled.div`
  margin-top: 25px;
  height: calc(100vh - 250px);
  background-color: var(--clr-white);
  display: flex;
  padding: 15px 15px;
  overflow: auto;
`;
export default Users;
