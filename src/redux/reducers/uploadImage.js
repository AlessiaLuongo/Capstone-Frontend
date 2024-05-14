import { UPLOAD_IMAGE } from "../action";

const initialState = {
  avatar: null,
};

const uploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        avatar: action.payload,
      };

    default:
      return state;
  }
};

export default uploadImageReducer;
