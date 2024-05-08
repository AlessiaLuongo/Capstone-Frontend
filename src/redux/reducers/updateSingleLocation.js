import { UPDATE_SINGLE_LOCATION } from "../action";

const initialState = {
  content: null,
};

const updateLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_LOCATION:
      return {
        ...state,
        content: action.payload.content,
      };

    default:
      return state;
  }
};
export default updateLocationReducer;
