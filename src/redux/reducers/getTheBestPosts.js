import { GET_THE_BEST_POSTS, STOP_LOADER } from "../action";

const initialState = {
  content: [],
  isLoading: true,
};

const getTheBestPosts = (state = initialState, action) => {
  switch (action.type) {
    case GET_THE_BEST_POSTS:
      return {
        ...state,
        content: action.payload.data,
        isLoading: false,
      };

    case STOP_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
export default getTheBestPosts;
