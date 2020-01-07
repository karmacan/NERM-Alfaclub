const initialState = {
  token: localStorage.getItem('user_token'),
  isAuthed: false,
  isLoading: true,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      localStorage.setItem('user_token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthed: true,
        isLoading: false
      };

    case "SIGNUP_FAILURE":
      localStorage.removeItem('user_token');
      return {
        ...state,
        token: null,
        isAuthed: false,
        isLoading: false
      };

    default:
      return state;
  }
}