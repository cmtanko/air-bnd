import axios from "axios";

import { ACTION_TYPES } from "../constants/actionConstants";

import absoluteUrl from "next-absolute-url";

export const getRooms =
  (req, page = 1, location = "") =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(
        `${origin}/api/rooms?page=${page}&location=${location}`
      );
      dispatch({
        type: ACTION_TYPES.GET_ROOMS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.GET_ROOMS_FAIL,
        payload: error?.response?.data?.message || error
      });
    }
  };

export const clearError = (req) => async (dispatch) => {
  dispatch({
    type: ACTION_TYPES.CLEAR_ERROR,
    payload: null
  });
};

export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/rooms/${id}`);

    dispatch({
      type: ACTION_TYPES.GET_ROOM_DETAIL_SUCCESS,
      payload: data.room
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.GET_ROOM_DETAIL_FAIL,
      payload: error.response.data.message
    });
  }
};

export const updateInformRecord = (answers, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    dispatch({ type: ACTION_TYPES.UPDATE_INFORM_RECORDS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.put(
      `${origin}/api/informrecords/${id}`,
      answers,
      config
    );
    dispatch({
      type: ACTION_TYPES.UPDATE_INFORM_RECORDS_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.UPDATE_INFORM_RECORDS_FAIL,
      payload: error?.response?.data?.message || "Error"
    });
  }
};

export const updateAnswers = (answers) => async (dispatch) => {
  dispatch({
    type: "UPDATE_ANSWERS",
    payload: answers
  });
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.put(`/api/reviews`, reviewData, config);
    dispatch({
      type: ACTION_TYPES.NEW_REVIEW_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.NEW_REVIEW_FAIL,
      payload: error.toString()
    });
  }
};

export const checkReviewAvailability = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.REVIEW_AVAILABILITY_REQUEST });

    const { data } = await axios.get(
      `/api/reviews/check_review_availability?roomId=${roomId}`
    );

    dispatch({
      type: ACTION_TYPES.REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.REVIEW_AVAILABILITY_FAIL,
      payload: error?.response?.data?.message || "Error"
    });
  }
};
