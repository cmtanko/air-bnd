import { ACTION_TYPES } from "../constants/actionConstants";

export const authReducer = (state = { loading: true, user: null }, action) => {
  switch (action.type) {
    case ACTION_TYPES.REGISTER_USER_REQUEST:
      return {
        loading: true,
        success: false,
        error: false
      };
    case ACTION_TYPES.REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false
      };
    case ACTION_TYPES.REGISTER_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload
      };

    case ACTION_TYPES.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false
      };
    case ACTION_TYPES.LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case ACTION_TYPES.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload
      };
    default:
      return state;
  }
};
