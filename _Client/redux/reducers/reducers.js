import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomsReducer";
import { authReducer, userReducer } from "./usersReducer";

const reducer = combineReducers({
  room: roomDetailsReducer,
  allRooms: allRoomsReducer,
  auth: authReducer,
  user: userReducer
});

export default reducer;
