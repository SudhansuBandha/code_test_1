import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../context/context";
import { useFormContext } from "../../context/form_validate_context";

function AddUsers() {
  const { handleRegister } = useGlobalContext();
  const history = useHistory();

  const {
    username,
    email,
    password,
    passwordCheck,
    handleChange,
    errors,
    validateInfo,
    isSubmitting,
    setIsSubmitting,
    refresh,
  } = useFormContext();

  const submitRegisterHandeler = (e) => {
    e.preventDefault();
    validateInfo();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleRegister({ email, password, username });

      history.push("/admin-panel/landing");
    }
  }, [errors]);

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Container>
      <Wrapper onSubmit={submitRegisterHandeler}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h4>Add User Details</h4>
        </div>
        <label>UserName</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Enter User's Name"
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
        <label>Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          placeholder="Enter User Email Address"
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Must be 8 digits or more"
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <label>Confirm Password</label>
        <input
          type="text"
          id="passwordCheck"
          name="passwordCheck"
          placeholder=""
          value={passwordCheck}
          onChange={handleChange}
        />
        {errors.passwordCheck && <p>{errors.passwordCheck}</p>}
        <input type="submit" value="Submit" />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height:100%;
  width: 100%;
  display:flex;
  justify-content: center;

}
`;
const Wrapper = styled.form`
  margin-top: 2%;
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
    box-shadow: rgb(0 0 0 / 7%) 0px 5px 10px 10px;
  }

  input[type="submit"]:hover {
    background-color: var(--clr-green-3);
    box-shadow: rgb(0 0 0 / 17%) 0px 5px 10px 10px;
  }
  p {
    font-size: 1rem;
    color: var(--clr-red-1);
  }
`;
export default AddUsers;
