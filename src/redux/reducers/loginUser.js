import { LOGIN } from "../action";

const accessToken = {
  accessToken: "",
};

const loginUserReducer = (state = accessToken, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
export default loginUserReducer;
