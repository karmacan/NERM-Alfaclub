const initialState = {
  posts: [], /* all posts of all users */
  currentPost: null,
  isLoading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case 'ON_POST_SUBMIT':
    case 'ON_POST_DELETE':
    case 'GET_POST_LIST':
      return {
        ...state,
        //currentPost: null,
        posts: action.payload,
        isLoading: false
      }

    case 'ON_LIKE_UPDATE':
      return {
        ...state,
        currentPost: action.payload
      }

    case 'CLEAR_CURRENT_POST':
      return {
        ...state,
        currentPost: null
      }

    case 'ON_COMMENT_DELETE':
    case 'ON_COMMENT_SUBMIT':
      return {
        ...state,
        currentPost: action.payload,
        isLoading: false
      }

    case 'LIKE_POST_ERROR':
    case 'GET_POSTS_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }

    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: action.payload
      }
    
    default:
      return state;
  }
}

export default postReducer;