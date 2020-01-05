import React from 'react';

import { connect } from 'react-redux';

function Alerts(props) {
  if (props.alerts === undefined || props.alerts.length === 0) return null;

  const mapAlerts = props.alerts.map(alert => (
    <div 
      key={alert.id} 
      className={`alert alert-${alert.type}`}
      >
      {alert.msg}
    </div>
  ));

  ////////////////////////////////////////
  // RETURN JSX

  return (
    <section className="case">
      {mapAlerts}
    </section>
  );
}

////////////////////////////////////////
// CONNECT REDUX

const mapStateToProps = rootState => {
  //console.log(rootState); // root reducer's state
  return {
    alerts: rootState.partialsReducer.alerts
  };
};

const mapDispatcherToProps = {};

export default connect(mapStateToProps, mapDispatcherToProps)(Alerts);