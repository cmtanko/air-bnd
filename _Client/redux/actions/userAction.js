import axios from "axios";

import { ACTION_TYPES } from "../constants/actionConstants";
import absoluteUrl from "next-absolute-url";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({ type: ACTION_TYPES.REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.post(
      `${origin}/api/auth/register`,
      userData,
      config
    );

    dispatch({
      type: ACTION_TYPES.REGISTER_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.REGISTER_USER_FAIL,
      payload: error?.response?.data?.message || "Error"
    });
  }
};

export const loadUser = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({ type: ACTION_TYPES.LOAD_USER_REQUEST });

    const { data } = await axios.get(`${origin}/api/me`);

    dispatch({
      type: ACTION_TYPES.LOAD_USER_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.LOAD_USER_FAIL,
      payload: error?.response?.data?.message || ""
    });
  }
};

export const updateProfile = (req, userData) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({ type: ACTION_TYPES.UPDATE_USER_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.put(
      `${origin}/api/account/update`,
      userData,
      config
    );

    dispatch({
      type: ACTION_TYPES.UPDATE_USER_PROFILE_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.UPDATE_USER_PROFILE_FAIL,
      payload: error?.response?.data?.message || "Error"
    });
  }
};
