import { GET_FAVOURITE_ACTIVITIES, ADD_FAVOURITE_ACTIVITIES } from "../action";

const initialState = {
  content: [],
};

const getFavouriteActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITE_ACTIVITIES:
      return {
        ...state,
        content: action.payload.content,
      };
    case ADD_FAVOURITE_ACTIVITIES:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
export default getFavouriteActivitiesReducer;
