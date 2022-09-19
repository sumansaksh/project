import {
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  REGISTER_USER_SUCCES,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCES,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCES,
  LOGOUT_USER_FAIL,
  CLEAR_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCES,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCES,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCES,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCES,
  RESET_PASSWORD_FAIL,
} from "../Constants/userConstants";

import axios from "axios";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.post(`/login`, { email, password }, config);

    dispatch({ type: LOGIN_SUCCES, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//user loading
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/me`);

    dispatch({ type: LOAD_USER_SUCCES, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/logout`);
    dispatch({ type: LOGOUT_USER_SUCCES });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

//register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post(`/register`, userData);

    dispatch({ type: REGISTER_USER_SUCCES, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(`/me/update`, userData);

    dispatch({ type: UPDATE_PROFILE_SUCCES, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put(`/password/update`, passwords);

    dispatch({ type: UPDATE_PASSWORD_SUCCES, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.post(`/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCES, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reset password

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.put(
      `/password/reset/${token}`,
      password,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCES, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//error clearing
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
