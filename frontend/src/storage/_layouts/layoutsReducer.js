const initialState = {
  alerts: [
    // { id, type, msg }
  ]
}

function layoutReducer(state = initialState, action) {
  switch (action.type) {

    case 'ALERT_DISPLAY':
      const alert = action.payload;
      return {
        ...state,
        alerts: [
          ...state.alerts,
          alert
        ]
      };

    case 'ALERT_REMOVE':
      const alertId = action.payload;
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== alertId)
      }

    default:
      return state;
  }
}

export default layoutReducer;