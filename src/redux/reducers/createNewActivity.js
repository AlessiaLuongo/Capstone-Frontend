import { CREATE_NEW_ACTIVITY } from "../action";

const initialState = {
  content: [],
};

const createNewActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ACTIVITY:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return state;
  }
};
export default createNewActivityReducer;
