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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.NEW_REVIEW_RESET:
      return {
        loading: true
      };
    case ACTION_TYPES.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload
      };
    case ACTION_TYPES.NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.REVIEW_AVAILABILITY_REQUEST:
      return {
        loading: true
      };
    case ACTION_TYPES.REVIEW_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        reviewAvailable: action.payload
      };
    case ACTION_TYPES.REVIEW_AVAILABILITY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
