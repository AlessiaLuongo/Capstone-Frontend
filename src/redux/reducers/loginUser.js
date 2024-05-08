import { LOGIN } from "../action";
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
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
export default loginUserReducer;