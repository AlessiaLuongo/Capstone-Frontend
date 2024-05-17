import { LOGIN, UPDATE_USER_INFOS, LOGOUT_USER } from "../action";
import { CURRENT_USER } from "../action";

const accessToken = {
  accessToken: "",
  user: null,
};

const loginUserReducer = (state = accessToken, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload,
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

    default:
      return state;
  }
};
export default loginUserReducer;
