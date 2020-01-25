const initialState = {
  posts: [], /* all posts of all users */
  currentPost: null,
  isLoading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case 'ON_SUBMIT_POST':
    case 'ON_POST_DELETE':
    case 'ON_LIKE_UPDATE':
    case 'GET_POST_LIST':
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      }

    case 'LIKE_POST_ERROR':
    case 'GET_POSTS_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    
    default:
      return state;
  }
}

export default postReducer;