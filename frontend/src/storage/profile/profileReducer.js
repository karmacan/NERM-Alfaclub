const initialState = {
  isLoading: true,
  error: {},
  currentProfile: null, /* for current or visiting */
  profiles: [], /* fro public ones */
  repos: [] /* for github ones */
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_PROFILE':
    case 'GET_USER_PROFILE':
    case 'POST_USER_PROFILE':
      return {
        ...state,
        currentProfile: action.payload,
        isLoading: false
      };

    case 'USER_PROFILE_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'USER_PROFILE_CLEAR':
      return {
        ...state,
        currentProfile: null,
        repos: [],
        isLoading: true
      };

    default:
      return state;
  }
}

export default profileReducer;