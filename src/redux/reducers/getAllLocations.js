import { GET_ALL_LOCATIONS } from "../action";

const initialState = {
  content: [],
};

const getAllLocations = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOCATIONS:
      return {
        ...state,
        content: action.payload.content,
      };

    default:
      return state;
  }
};
export default getAllLocations;
