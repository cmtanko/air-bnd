import { combineReducers } from "redux";
import { checkBookingReducer } from "./bookingReducer";
import { authReducer, userReducer } from "./usersReducer";
import { allRoomsReducer, roomDetailsReducer } from "./roomsReducer";

const reducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  room: roomDetailsReducer,
  allRooms: allRoomsReducer,
  checkBooking: checkBookingReducer
});

export default reducer;
