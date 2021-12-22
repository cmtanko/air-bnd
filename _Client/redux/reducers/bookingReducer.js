import { ACTION_TYPES } from "../constants/actionConstants";

export const checkBookingReducer = (state = { available: null }, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHECK_BOOKING_REQUEST:
      return {
        loading: true
      };
    case ACTION_TYPES.CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload
      };
    case ACTION_TYPES.CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
