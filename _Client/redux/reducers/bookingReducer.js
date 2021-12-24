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

export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case ACTION_TYPES.BOOKED_DATES_SUCCESS:
      return {
        dates: action.payload
      };
    case ACTION_TYPES.BOOKED_DATES_FAIL:
      return {
        error: action.payload
      };
    default:
      return state;
  }
};

export const myBookingReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case ACTION_TYPES.MY_BOOKINGS_SUCCESS:
      return {
        bookings: action.payload
      };
    case ACTION_TYPES.MY_BOOKINGS_FAIL:
      return {
        error: action.payload
      };
    default:
      return state;
  }
};

export const bookingDetailsReducer = (
  state = { booking: {} },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.BOOKING_DETAILS_SUCCESS:
      return {
        booking: action.payload
      };
    case ACTION_TYPES.BOOKING_DETAILS_FAIL:
      return {
        error: action.payload
      };
    default:
      return state;
  }
};
