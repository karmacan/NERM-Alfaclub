import React from 'react';

import { useEffect } from 'react';

import shortid from 'shortid';

import Spinner from '../_layouts/Spinner';
import ProfileListUnit from './ProfileListUnit';

import { connect } from 'react-redux';
import { profilesGet } from '../../storage/profile/profileDispatcher';

function ProfileList(props) {
  useEffect(() => {
    props.profilesGet();
  }, []);

  const mapProfiles = () => {
    return props.profile.profiles.map(profile => <ProfileListUnit profileUnit={profile} key={shortid.generate()} />)
  }

  if (props.profile.isLoading) return <Spinner />

  return (
    <section className="case">
      {/* { console.log(props.profile.profiles) } */}
      <h1 className="txt-l txt-primary">
        Developer Profiles
      </h1>
      <p className="txt-m">
        <i className="fas fa-users"></i>
        &nbsp;Meet Your Colleagues
      </p>
      { mapProfiles() }
    </section>
  );
}

const mapStateToProps = (rootState) => ({
  profile: rootState.profileReducer
});

const mapDispetcherToProps = {
  profilesGet
};

export default connect(mapStateToProps, mapDispetcherToProps)(ProfileList);
