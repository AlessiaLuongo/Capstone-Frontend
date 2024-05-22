import { START_LOADER, STOP_LOADER, UPDATE_SINGLE_LOCATION } from "../action";

const initialState = {
  content: null,
  isLoading: false,
};

const updateLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_LOCATION:
      return {
        ...state,
        content: action.payload.content,
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
export default updateLocationReducer;
