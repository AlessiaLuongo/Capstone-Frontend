import { GET_ALL_ACTIVITIES } from "../action";

const initialState = {
  content: [],
};

const getAllActivities = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        content: action.payload.content,
      };
    default:
      return state;
  }
};
export default getAllActivities;
