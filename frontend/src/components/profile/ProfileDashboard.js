import React from 'react';
import './ProfileDashboard.css';
import ProfileDashboardButtons from './ProfileDashboardButtons';

import { Link } from 'react-router-dom';

import { useEffect } from 'react'; // lifecycle hook

import Spinner from '../_layouts/Spinner';

import { connect } from 'react-redux';
import { profileGet } from '../../storage/profile/profileDispatcher';

function ProfileDashboard(props) {
  useEffect(() => {
    props.profileGet();
  }, []);

  ////////////////////////////////////////
  // RETURN JSX

  // IF LOADING
  if (props.profile.isLoading && props.profile.currentProfile === null) return <Spinner />
  
  // IF PROFILE NOT EXISTS
  else if (props.profile.currentProfile === null) return (
    <section className="case">
      <h1 className="txt-l txt-primary">Dashboard</h1>
      <p className="txt-m">
        <i className="fas fa-user"></i>
        &nbsp;Manage Your Profile
      </p>
      <p className="txt-m my-1">You haven't created your profile yet, please create one!</p>
      <Link to="/profile/create" className="btn btn-primary my-1">Create Profile</Link>
    </section>
  );

  return (
    <section className="case">
      <h1 className="txt-l txt-primary">Dashboard</h1>
      <p className="txt-m">
        <i className="fas fa-user"></i>
        &nbsp;Manage Your Profile
      </p>

      {/* Dashboard Buttons */}
      <ProfileDashboardButtons />

      {/* Exp */}
      <h2 className="my-1">Education Credentials</h2>
      
      {/* Edu */}
      <h2 className="my-1">Experience Credentials</h2>

      <div className="my-1">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i> 
          &nbsp;Delete My Profile
        </button>
      </div>

    </section>
  );
}

////////////////////////////////////////
// CONNECT REDUX

const mapStateToProps = (rootState) => ({
  auth: rootState.authReducer,
  profile: rootState.profileReducer
});

const mapDispatcherToProps = {
  profileGet
};

export default connect(mapStateToProps, mapDispatcherToProps)(ProfileDashboard);
