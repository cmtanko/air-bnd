import { combineReducers } from "redux";
import { authReducer, userReducer } from "./usersReducer";
import { allRoomsReducer, roomDetailsReducer } from "./roomsReducer";
import {
  myBookingReducer,
  bookedDatesReducer,
  checkBookingReducer,
  bookingDetailsReducer,
} from "./bookingReducer";

const reducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  room: roomDetailsReducer,
  allRooms: allRoomsReducer,
  myBooking: myBookingReducer,
  bookedDates: bookedDatesReducer,
  checkBooking: checkBookingReducer,
  bookingDetails: bookingDetailsReducer
});

export default reducer;
