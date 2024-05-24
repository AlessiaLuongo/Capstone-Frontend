import { REGISTER, START_LOADER, STOP_LOADER } from "../action";

const initialState = {
  content: [],
  isLoading: false,
};

const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        content: action.payload,
        isLoading: false,
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
export default registerUserReducer;
