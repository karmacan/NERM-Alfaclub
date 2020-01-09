import React, { Fragment } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

function PrivateRoute(props) {
  // Destruct
  const {
    component: Component,
    ...rest /* exact, path, ... */
  } = props;

  return (
    <Route 
      {...rest} 
      render={_props => {
        //console.log(_props);
        if (!props.isAuthed) return <Redirect to="/login" />;
        else return <Component {..._props} />;
      }} 
    />
  );
}

const mapStateToProps = rootState => {
  return {
    isAuthed: rootState.authReducer.isAuthed
  };
}

export default connect(mapStateToProps, null)(PrivateRoute);
