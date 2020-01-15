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
      <h2 className="my-1">
        Experience Credentials
      </h2>
      <table className="dev-table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hidden-s">Title</th>
            <th className="hidden-s">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple</td>
            <td className="hidden-s">Senior Developer</td>
            <td className="hidden-s">
              Oct 2011 - Current
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Google</td>
            <td className="hidden-s">Senior Developer</td>
            <td className="hidden-s">
              Oct 2004 - Nov 2010
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      {/* Edu */}
      <h2 className="my-1">
        Education Credentials
      </h2>
      <table className="dev-table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hidden-s">Degree</th>
            <th className="hidden-s">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>University of Washington</td>
            <td className="hidden-s">Masters</td>
            <td className="hidden-s">
              Sep 1993 - June 1999
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

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
