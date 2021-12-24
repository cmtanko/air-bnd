import axios from "axios";

import { ACTION_TYPES } from "../constants/actionConstants";

const origin = process.env.ORIGIN;

export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.CHECK_BOOKING_REQUEST });

      let link = `${origin}/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ACTION_TYPES.CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.CHECK_BOOKING_FAIL,
        payload: error
      });
    }
  };

export const getBookedDates = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${origin}/api/bookings/check_booked_dates?roomId=${id}`
    );

    dispatch({
      type: ACTION_TYPES.BOOKED_DATES_SUCCESS,
      payload: data.bookedDates
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.BOOKED_DATES_FAIL,
      payload: error
    });
  }
};

export const myBookings = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${origin}/api/bookings/me`);

    dispatch({
      type: ACTION_TYPES.MY_BOOKINGS_SUCCESS,
      payload: data.bookings
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.MY_BOOKINGS_FAIL,
      payload: error
    });
  }
};

export const getBookingDetails = (authCookie, req, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        cookie: authCookie
      }
    };

    const { data } = await axios.get(`${origin}/api/bookings/${id}`, config);

    dispatch({
      type: ACTION_TYPES.BOOKING_DETAILS_SUCCESS,
      payload: data.booking
    });
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.BOOKING_DETAILS_FAIL,
      payload: error.toString()
    });
  }
};
