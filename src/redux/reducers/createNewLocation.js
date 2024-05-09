import { CREATE_NEW_LOCATION } from "../action";

const initialState = {
  content: [],
};

const createNewLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_LOCATION:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return state;
  }
};
export default createNewLocationReducer;
