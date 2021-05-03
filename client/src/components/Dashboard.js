import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

import AdminUsers from "./Pages/AdminUsers";
import AdminLandingPage from "./Pages/AdminLandingPage";
import Users from "./Pages/Users";
import AddUsers from "./Pages/AddUsers";
import { useFormContext } from "../context/form_validate_context";

function Dashboard() {
  const { isSidebarOpen, handleSidebar } = useGlobalContext();
  const { refresh } = useFormContext();
  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) history.push("/");
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

          <Link to="/admin-panel/add_users" onClick={refresh}>
            <Button>Add User</Button>
          </Link>
        </div>

        <Switch>
          <Route
            path="/admin-panel/landing"
            exact
            component={AdminLandingPage}
          ></Route>
          <Route
            path="/admin-panel/admin_users"
            exact
            component={AdminUsers}
          ></Route>
          <Route path="/admin-panel/users" exact component={Users}></Route>
          <Route
            path="/admin-panel/add_users"
            exact
            component={AddUsers}
          ></Route>
        </Switch>
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
  @media screen and (max-width: 650px) {
    width: 100vw;
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

export default Dashboard;
