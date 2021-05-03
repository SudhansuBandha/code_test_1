import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/context";
import { useHistory } from "react-router-dom";

function Login() {
  const { handleLogin, decode } = useGlobalContext();

  const [email_login, setEmailLogin] = useState("admin@careerninja.com");
  const [password_login, setPasswordLogin] = useState("admin");

  let history = useHistory();

  const submitLoginHandeler = (e) => {
    e.preventDefault();

    handleLogin({ email_login, password_login });
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) {
      const user = decode();
      if (user.isAdmin) history.push("/admin-panel/landing");
      else history.push("/profile");
    }
  });

  return (
    <Container>
      <Wrapper onSubmit={submitLoginHandeler}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h4>Login Via Email</h4>
        </div>

        <label>Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email_login}
          onChange={(e) => setEmailLogin(e.target.value)}
          placeholder="Your primary address"
        />

        <label>Password</label>
        <input
          type="password"
          id="password"
          value={password_login}
          name="password"
          placeholder="Must be 8 digits or more"
          onChange={(e) => setPasswordLogin(e.target.value)}
        />

        <input type="submit" value="Log In" />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height:100%;
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
`;
const Wrapper = styled.form`
  width: 335px;
  min-height: auto;
  input[type="text"],
  [type="password"] {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--clr-green-2);
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
  }
  input:focus {
    border: 2px solid var(--clr-green-2);
  }
  input[type="submit"] {
    margin-top: 30px;
    background-color: var(--clr-green-2);
    color: white;
    padding: 6px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 30%;
    font-size: 15px;
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 5px 5px;
  }

  input[type="submit"]:hover {
    background-color: var(--clr-green-3);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }
`;
export default Login;
