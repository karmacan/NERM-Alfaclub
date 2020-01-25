const initialState = {
  isLoading: true,
  error: {},
  currentProfile: null, /* for current or visiting */
  profiles: [], /* fro public ones */
  isReposFetched: false,
  repos: null /* for github ones */
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'ON_PROFILE_UPDATE':
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

    case 'USER_OBSERVE_PROFILES':
    case 'USER_PROFILE_LOGOUT':
      return {
        ...state,
        currentProfile: null,
        repos: [],
        isLoading: true
      };

    case 'USER_PROFILE_CLEAR':
      return {
        ...state,
        currentProfile: null,
        repos: [],
        isLoading: false
      };

    case 'GET_ALL_PROFILES':
      return {
        ...state,
        profiles: action.payload,
        isLoading: false
      };

    case 'GET_GITHUB_REPOS':
      return {
        ...state,
        isReposFetched: true,
        repos: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
}

export default profileReducer;