import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";

function Sidebar() {
  const { isSidebarOpen, handleSidebar, decode, logout } = useGlobalContext();
  const history = useHistory();
  const [user, setUser] = useState({});

  const logoutHandler = () => {
    logout();
    history.push("/");
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) setUser(decode());
  }, []);
  return (
    <Container>
      <div className={`${isSidebarOpen ? "show-sidebar" : "sidebar"}`}>
        <h1>careerninja</h1>

        {Object.keys(user).length > 0 && user.isAdmin && (
          <div>
            <ul>
              <li onClick={handleSidebar}>
                <Link to="/admin-panel/landing">Dashboard</Link>
              </li>
              <li onClick={handleSidebar}>
                <Link to="/admin-panel/users">Users</Link>
              </li>
              <li onClick={handleSidebar}>
                <Link to="/admin-panel/admin_users">Admin Users</Link>
              </li>
            </ul>
            <div className="logout" onClick={logoutHandler}>
              Logout
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.aside`
  .sidebar {
    background-color: var(--clr-white);
    height: 100vh;
    width: 275px;
    border-right: 3px solid var(--clr-grey-5);
    padding: 70px 5px 0px 20px;

    @media screen and (max-width: 650px) {
      display: none;
    }
  }

  ul {
    list-style: none;
  }
  li {
    line-height: 300%;

    border-bottom: 1px solid var(--clr-grey-3);
  }
  .show-sidebar {
    background-color: var(--clr-white);
    height: 100vh;
    width: 275px;
    border-right: 3px solid var(--clr-grey-5);
    padding: 70px 5px 0px 20px;
    z-index: 1000;
    transition: var(--transition);
  }
  a {
    text-decoration: none;
    color: var(--clr-grey-4);
  }
  a:hover {
    color: var(--clr-green-2);
  }

  .logout {
    margin-top: 40px;
    color: var(--clr-orange-1);
    font-weight: bold;
  }
  .logout:hover {
    cursor: pointer;
  }
`;
export default Sidebar;
