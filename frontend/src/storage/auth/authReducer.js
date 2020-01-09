const initialState = {
  isAuthed: false,
  token: localStorage.getItem('user_token'),
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case "AUTH_SUCCESS": /* for Signup and Login */
      localStorage.setItem('user_token', action.payload.token);
      //console.log(action.payload.token);
      return {
        ...state,
        isAuthed: true,
        token: action.payload.token,
      };

    case "AUTH_FAILURE":
      localStorage.removeItem('user_token');
      return {
        ...state,
        isAuthed: false,
        token: null,
      };

    case "USER_LOAD": /* for App */
      return {
        ...state,
        isAuthed: true,
        user: action.payload
      };

    default:
      return state;
  }
}