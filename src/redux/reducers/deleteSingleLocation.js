import { DELETE_SINGLE_LOCATION } from "../action";

const initialState = {
  content: [],
};

const deleteSingleLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SINGLE_LOCATION:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return state;
  }
};
export default deleteSingleLocationReducer;
