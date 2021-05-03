import React, { useState, useContext } from "react";
import validateEmail from "../utils/validateEmail";

const FormContext = React.createContext();

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordCheck: "",
};
export const FormProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  async function validateInfo() {
    let errors = {};

    if (!state.username.trim()) {
      errors.username = "Username required";
    }

    if (!state.email) {
      errors.email = "Email required";
    } else {
      var check = await validateEmail(state.email);
      if (check) errors.email = "Email already registered";
    }

    if (!state.password) {
      errors.password = "Password is required";
    } else if (state.password.length < 8) {
      errors.password = "Password needs to be 8 characters or more";
    }

    if (!state.passwordCheck) {
      errors.passwordCheck = "Password is required";
    } else if (state.passwordCheck !== state.password) {
      errors.passwordCheck = "Passwords do not match";
    }

    setErrors(errors);
  }

  const refresh = () => {
    setState(initialState);
    setIsSubmitting(false);
    setErrors({});
  };
  return (
    <FormContext.Provider
      value={{
        ...state,
        errors,
        handleChange,
        validateInfo,
        isSubmitting,
        setIsSubmitting,
        refresh,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
// make sure use
export const useFormContext = () => {
  return useContext(FormContext);
};
