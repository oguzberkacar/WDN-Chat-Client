import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  API_FAILED,
  LOGIN_USER_TWOFACTOR,
  LOGIN_USER_TWOFACTOR_SUCCESS,
  GET_USER,
  IS_LOGINING,
  STOP_LOADING,
} from "./constants";
import Cookies from "js-cookie";

import { getLoggedInUser } from "../../helpers/authUtils";

let INIT_STATE = {
  user: null,
  loading: false,
  twofactor: false,
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, twofactor: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        twofactor: false,
        loading: false,
        error: null,
      };
    case IS_LOGINING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };

    case GET_USER:
      return { ...state, loading: false, user: action.payload, error: null };

    case LOGIN_USER_TWOFACTOR:
      return {
        ...state,
        base64: action.payload,
        twofactor: true,
        loading: false,
        error: null,
      };

    case LOGIN_USER_TWOFACTOR_SUCCESS:
      return { ...state, twofactor: false, loading: true, error: null };

    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case LOGOUT_USER:
      return { ...state, user: null };

    case FORGET_PASSWORD:
      return { ...state, loading: true };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordResetStatus: action.payload,
        loading: false,
        error: null,
      };

    case API_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};

export default Auth;
