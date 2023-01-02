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
  GET_USER,
  IS_LOGINING,
  STOP_LOADING,
} from "./constants";

export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const isLogining = () => ({
  type: IS_LOGINING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
})

export const loginUser = (username, password, history) => ({
  type: LOGIN_USER,
  payload: { username, password, history },
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserTwofactor = (base64, code, history) => ({
  type: LOGIN_USER_TWOFACTOR,
  payload: { base64, code, history },
});

export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: { user },
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const forgetPassword = (email, type) => ({
  type: FORGET_PASSWORD,
  payload: { email, type },
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: passwordResetStatus,
});

export const apiError = (error) => ({
  type: API_FAILED,
  payload: error,
});
