import { combineReducers } from "redux";
import { allRoomsReducer, roomDetailsReducer } from "./roomsReducer";

const reducer = combineReducers({
  room: roomDetailsReducer,
  allRooms: allRoomsReducer
});

export default reducer;
