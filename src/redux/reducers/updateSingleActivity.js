import { START_LOADER, STOP_LOADER, UPDATE_SINGLE_ACTIVITY } from "../action";

const initialState = {
  content: null,
  isLoading: false,
};

const updateActivity = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACTIVITY:
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
export default updateActivity;
