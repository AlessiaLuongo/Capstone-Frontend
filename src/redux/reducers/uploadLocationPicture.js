import { UPLOAD_LOCATION_PICTURE } from "../action";

const initialState = {
  picture: null,
};

const uploadLocationPictureReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_LOCATION_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    default:
      return state;
  }
};

export default uploadLocationPictureReducer;
