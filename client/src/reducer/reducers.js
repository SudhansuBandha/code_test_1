import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../actions";

const reducer = (state, action) => {
  if (action.type === LOGIN_BEGIN) {
    return { ...state, login_begin: true };
  }
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      login_begin: false,
      user: action.payload,
    };
  }
  if (action.type === LOGIN_ERROR) {
    return {
      ...state,
      login_begin: false,
      login_error: true,
      error_msg: action.payload,
    };
  }

  if (action.type === REGISTER_BEGIN) {
    return { ...state, login_begin: true };
  }
  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      login_begin: false,
      user: action.payload,
    };
  }
  if (action.type === REGISTER_ERROR) {
    return {
      ...state,
      login_begin: false,
      login_error: true,
      error_msg: action.payload,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
