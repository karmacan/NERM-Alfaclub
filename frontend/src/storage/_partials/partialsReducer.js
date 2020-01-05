const initialState = {
  // alert: {
  //   id
  // }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'ALERT_DISPLAY':
      const alert = action.payload;
      return {
        ...state,
        alert
      }

    case 'ALERT_REMOVE':
      const alertId = action.payload;
      return state.filter(alert => alert.id !== alertId);

    default:
      return state;
  }
}