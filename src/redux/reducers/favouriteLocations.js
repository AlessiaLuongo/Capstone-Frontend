import {
  GET_FAVOURITE_LOCATIONS,
  ADD_FAVOURITE_LOCATION,
  DELETE_FAVOURITE_LOCATION,
} from "../action";

const initialState = {
  content: [],
};

const getFavouriteLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITE_LOCATIONS:
      return {
        ...state,
        content: action.payload,
      };
    case ADD_FAVOURITE_LOCATION:
      return {
        ...state,
      };
    case DELETE_FAVOURITE_LOCATION:
      return {
        ...state,
        content: state.content.filter(
          (loation) => loation.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default getFavouriteLocationReducer;
