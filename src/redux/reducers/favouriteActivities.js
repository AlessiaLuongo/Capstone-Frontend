import {
  GET_FAVOURITE_ACTIVITIES,
  ADD_FAVOURITE_ACTIVITIES,
  DELETE_FAVOURITE_ACTIVITY,
} from "../action";

const initialState = {
  content: [],
};

const getFavouriteActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITE_ACTIVITIES:
      return {
        ...state,
        content: action.payload,
      };
    case ADD_FAVOURITE_ACTIVITIES:
      return {
        ...state,
      };
    case DELETE_FAVOURITE_ACTIVITY:
      return {
        ...state,
        content: state.content.filter(
          (activity) => activity.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default getFavouriteActivitiesReducer;
