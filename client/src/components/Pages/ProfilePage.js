import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import { useHistory } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../context/context";

function Profile(props) {
  const { isSidebarOpen, handleSidebar, logout, decode } = useGlobalContext();
  const [user, setUser] = useState({});
  const history = useHistory();

  const logoutHandler = () => {
    logout();
    history.push("/");
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) history.push("/");
    else setUser(decode());
  }, []);

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <div className="headline">
          <div>
            <Icon onClick={handleSidebar}>
              {isSidebarOpen ? (
                <h2>
                  <FaTimes />
                </h2>
              ) : (
                <h2>
                  <FaBars />
                </h2>
              )}
            </Icon>
          </div>

          <Button onClick={logoutHandler}>Logout</Button>
        </div>
        <Body>
          <h2>Hi {user.username},</h2>
        </Body>
      </Wrapper>
    </Container>
  );
}
const Container = styled.div`
  background-color: var(--clr-grey-1);
  display: flex;
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 95vw;
  padding: 30px 20px 0px 20px;
  .headline {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;
const Icon = styled.div`
  cursor: pointer;
  @media screen and (min-width: 650px) {
    display: none;
  }
`;
const Button = styled.div`
  background-image: linear-gradient(
    110deg,
    var(--clr-blue-1) 30%,
    var(--clr-blue-2) 80%
  );
  width: 120px;
  height: 35px;
  text-align: center;
  padding-top: 5px;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 5%) 0px 5px 5px 5px;
  color: var(--clr-white);

  &:hover {
    cursor: pointer;
  }
`;

const Body = styled.div`
  margin-top: 25px;
  height: calc(100vh - 250px);
  background-color: var(--clr-white);
  display: flex;
  padding: 15px 15px;
`;

export default Profile;
