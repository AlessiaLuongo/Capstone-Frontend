import { DELETE_SINGLE_ACTIVITY, START_LOADER, STOP_LOADER } from "../action";

const initialState = {
  content: [],
  isLoading: false,
};

const deleteSingleActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SINGLE_ACTIVITY:
      return {
        ...state,
        content: action.payload,
        isLoading: true,
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
export default deleteSingleActivityReducer;
