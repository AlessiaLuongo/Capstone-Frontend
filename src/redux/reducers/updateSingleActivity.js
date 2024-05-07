import { UPDATE_SINGLE_ACTIVITY } from "../action";

const initialState = {
  content: null,
};

const updateActivity = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SINGLE_ACTIVITY:
      return {
        ...state,
        content: action.payload.content,
      };
    default:
      return state;
  }
};
export default updateActivity;
