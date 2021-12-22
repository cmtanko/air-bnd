import axios from "axios";

import { ACTION_TYPES } from "../constants/actionConstants";

const origin = process.env.ORIGIN;

export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.CHECK_BOOKING_REQUEST });

      let link = `${origin}/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const { data } = await axios.get(link);
      console.warn({data})

      console.warn({data})
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
