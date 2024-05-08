import { DELETE_SINGLE_ACTIVITY } from "../action";

const initialState = {
  content: [],
};

const deleteSingleActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SINGLE_ACTIVITY:
      return {
        ...state,
        content: action.payload,
      };

    default:
      return state;
  }
};
export default deleteSingleActivityReducer;
