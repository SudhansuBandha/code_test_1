import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

function Headline() {
  let location = useLocation();
  var check = location.pathname.split("/")[2];

  return (
    <Container>
      <div>
        {check === "landing" ? (
          <Link to="/admin-panel/landing">
            <h5>Home</h5>
          </Link>
        ) : check === "admin_users" ? (
          <div style={{ display: "flex" }}>
            <h5 style={{ marginRight: "5px" }}>
              <Link to="/admin-panel/landing">Home</Link>
            </h5>
            <h5 style={{ marginRight: "5px", marginTop: "2px" }}>
              <FaChevronRight />
            </h5>
            <h5>Admin Users</h5>
          </div>
        ) : check === "users" ? (
          <div style={{ display: "flex" }}>
            <h5 style={{ marginRight: "5px" }}>
              <Link to="/admin-panel/landing">Home</Link>
            </h5>
            <h5 style={{ marginRight: "5px", marginTop: "2px" }}>
              <FaChevronRight />
            </h5>
            <h5>Users</h5>
          </div>
        ) : (
          check === ""
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 40px;
  background-color: var(--clr-grey-5);
  padding-left: 10px;
  padding-top: 10px;

  a {
    color: var(--clr-black-1);
  }
  a:hover {
    color: var(--clr-green-2);
  }
`;
export default Headline;
