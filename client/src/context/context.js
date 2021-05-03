import axios from "axios";
import React, { useState, useContext, useReducer } from "react";
import {
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../actions";
import reducer from "../reducer/reducers";
import jwt_decode from "jwt-decode";

const Context = React.createContext();

const initialState = {
  login_begin: false,
  login_error: false,
  user: {},
  error_msg: "",
  register_begin: false,
  register_error: false,
  added_user: {},
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = async ({ email_login, password_login }) => {
    dispatch({ type: LOGIN_BEGIN });

    try {
      const { data } = await axios.post("/api/auth/login", {
        email_login,
        password_login,
      });
      window.localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, payload: error });
    }
  };

  const handleRegister = async ({ email, password, username }) => {
    dispatch({ type: REGISTER_BEGIN });
    const isAdmin = false;
    try {
      const { data } = await axios.post("/api/auth/register", {
        email,
        password,
        username,
        isAdmin,
      });

      dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, payload: error });
    }
  };

  const decode = () => {
    if (window.localStorage.getItem("token") !== null)
      return jwt_decode(window.localStorage.getItem("token"));
    return;
  };

  const logout = () => {
    window.localStorage.removeItem("token");
  };
  return (
    <Context.Provider
      value={{
        ...state,
        isSidebarOpen,
        handleSidebar,
        handleLogin,
        handleRegister,
        decode,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export { Context, Provider };
