import React from 'react';
import './ProfileDashboard.css';
import ProfileDashboardButtons from './ProfileDashboardButtons';

import { Link } from 'react-router-dom';

import { useEffect } from 'react'; // lifecycle hook

import Spinner from '../_layouts/Spinner';

import ProfileEduTable from './ProfileEduTable';
import ProfileExpTable from './ProfileExpTable';

import { connect } from 'react-redux';
import { profileGet } from '../../storage/profile/profileDispatcher';
import { profileDelete } from '../../storage/profile/profileDispatcher';

function ProfileDashboard(props) {
  useEffect(() => {
    //console.log(props.profile.currentProfile);
    props.profileGet();
  }, []);

  ////////////////////////////////////////
  // DYNAMIC MARKUP

  const ifProfileEdu = () => {
    if (props.profile.currentProfile.education.length !== 0) {
      return <ProfileEduTable profile={props.profile} />;
    }
  }

  const ifProfileExp = () => {
    if (props.profile.currentProfile.jobExp.length !== 0) {
      return <ProfileExpTable profile={props.profile} />;
    }
  }

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

      {/* Edu */}
      { ifProfileEdu() }
      
      {/* Exp */}
      { ifProfileExp() }

      <div className="my-1">
        <button 
          className="btn btn-danger"
          onClick={() => props.profileDelete()}
          >
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
  profileGet,
  profileDelete
};

export default connect(mapStateToProps, mapDispatcherToProps)(ProfileDashboard);
