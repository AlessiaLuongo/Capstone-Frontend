import { UPLOAD_ACTIVITY_PICTURE } from "../action";

const initialState = {
  avatar: null,
};

const uploadActivityPictureReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_ACTIVITY_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    default:
      return state;
  }
};

export default uploadActivityPictureReducer;
