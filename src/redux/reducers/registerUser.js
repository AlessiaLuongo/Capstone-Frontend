import { REGISTER } from "../action";

const initialState = {
  content: [],
};

const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return state;
  }
};
export default registerUserReducer;
