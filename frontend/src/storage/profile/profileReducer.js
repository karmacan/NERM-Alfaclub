const initialState = {
  currentProfile: null, /* for current or visiting */
  profiles: [], /* fro public ones */
  repos: [], /* for github ones */
  isLoading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
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
          isLoading: false
        };

    default:
      return state;
  }
}

export default profileReducer;