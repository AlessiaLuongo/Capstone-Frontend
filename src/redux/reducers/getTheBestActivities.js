import { GET_THE_BEST_ACTIVITIES } from "../action";

const initialState = {
  content: [],
};

const getTheBestActivities = (state = initialState, action) => {
  switch (action.type) {
    case GET_THE_BEST_ACTIVITIES:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return state;
  }
};
export default getTheBestActivities;
