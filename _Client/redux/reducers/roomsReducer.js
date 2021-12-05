import { ACTION_TYPES } from "../constants/actionConstants";

export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ROOMS_SUCCESS:
      const { roomsCount, resPerPage, filteredRoomsCount, rooms } =
        action.payload;
      return {
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
      };
    case ACTION_TYPES.GET_ROOMS_FAIL:
      return {
        error: action.payload
      };
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ROOM_DETAIL_SUCCESS:
      return {
        room: action.payload
      };
    case ACTION_TYPES.GET_ROOM_DETAIL_FAIL:
      return {
        error: action.payload
      };
    default:
      return state;
  }
};
