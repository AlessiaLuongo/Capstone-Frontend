import { GET_ALL_ACTIVITIES, STOP_LOADER } from "../action";

const initialState = {
  content: [],
  isLoading: true,
};

const getAllActivities = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        content: action.payload.content,
        isLoading: false,
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
export default getAllActivities;
