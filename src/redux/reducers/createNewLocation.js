import { CREATE_NEW_LOCATION, START_LOADER, STOP_LOADER } from "../action";

const initialState = {
  content: [],
  isLoading: false,
};

const createNewLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_LOCATION:
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
export default createNewLocationReducer;
