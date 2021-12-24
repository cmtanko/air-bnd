import { combineReducers } from "redux";
import { authReducer, userReducer } from "./usersReducer";
import {
  allRoomsReducer,
  newReviewReducer,
  roomDetailsReducer,
  checkReviewReducer
} from "./roomsReducer";
import {
  myBookingReducer,
  bookedDatesReducer,
  checkBookingReducer,
  bookingDetailsReducer
} from "./bookingReducer";

const reducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  room: roomDetailsReducer,
  allRooms: allRoomsReducer,
  myBooking: myBookingReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  bookedDates: bookedDatesReducer,
  checkBooking: checkBookingReducer,
  bookingDetails: bookingDetailsReducer
});

export default reducer;
