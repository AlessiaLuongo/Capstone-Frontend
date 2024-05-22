import {
  LOGIN,
  UPDATE_USER_INFOS,
  LOGOUT_USER,
  START_LOADER,
  STOP_LOADER,
} from "../action";
import { CURRENT_USER } from "../action";

const accessToken = {
  accessToken: "",
  user: null,
  isLoading: false,
};

const loginUserReducer = (state = accessToken, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload,
        isLoading: false,
      };

    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER_INFOS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        accessToken: "",
      };

    case START_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default loginUserReducer;
