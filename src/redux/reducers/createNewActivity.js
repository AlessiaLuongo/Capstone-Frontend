import { CREATE_NEW_ACTIVITY, TURN_OFF_SPINNER } from "../action";

const initialState = {
  content: [],
  isLoading: true,
};

const createNewActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ACTIVITY:
      return {
        ...state,
        content: action.payload,
      };
    case TURN_OFF_SPINNER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default createNewActivityReducer;
