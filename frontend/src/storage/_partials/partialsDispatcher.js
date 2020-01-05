var shortid = require("shortid");

export const alertDisplay = (alertMsg, alertType) => {
  return (dispatch) => {
    const alertId = shortid.generate();
    dispatch({
      type: "ALERT_DISPALY",
      payload: {
        id: alertId,
        type: alertType,
        msg: alertMsg
      }
    });
  };
}