var shortid = require('shortid');

export const setAlert = (alertType, alertMsg) => {
  return (dispatch) => {
    const alertId = shortid.generate();
    dispatch({
      type: 'ALERT_DISPLAY',
      payload: {
        id: alertId,
        type: alertType,
        msg: alertMsg
      }
    });

    setTimeout(
      () => dispatch({
        type: 'ALERT_REMOVE',
        payload: alertId
      }),
      3000
    );
  };
}