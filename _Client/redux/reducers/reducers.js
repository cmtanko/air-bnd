import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomsReducer";
import { authReducer } from "./usersReducer";

const reducer = combineReducers({
  room: roomDetailsReducer,
  allRooms: allRoomsReducer,
  auth: authReducer
});

export default reducer;
