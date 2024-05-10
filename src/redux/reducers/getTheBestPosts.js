import { GET_THE_BEST_POSTS } from "../action";

const initialState = {
  content: [],
};

const getTheBestPosts = (state = initialState, action) => {
  switch (action.type) {
    case GET_THE_BEST_POSTS:
      return {
        ...state,
        content: action.payload.data,
      };

    default:
      return state;
  }
};
export default getTheBestPosts;
