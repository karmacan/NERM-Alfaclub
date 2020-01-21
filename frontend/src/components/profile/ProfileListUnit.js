import React from 'react';

import shortid from 'shortid';

import { Link } from 'react-router-dom';

function ProfileListUnit(props) {
  const {
    user: {
      _id: userId,
      name,
      avatar: gravatar
    },
    profession,
    expLvl,
    skills
  } = props.profileUnit;

  const mapSkills = () => {
    return skills.map(skill => (
      <li className="txt-primary" key={ shortid.generate() }>
        <i className="fas fa-check"></i>
        &nbsp;{ skill }
      </li>
    ));
  }

  return (
    <div className="grid-profile-unit bg-light">
      {/* Avatar */}
      <img 
        src={ gravatar } 
        className="img img-round" 
      />
      {/* Info */}
      <div>
        <h2>{ name }</h2>
        <p>{ profession }</p>
        <p>{ expLvl }</p>
      </div>
      {/* Skills */}
      <ul className="hidden-s">
        { mapSkills() }
      </ul>
      {/* View */}
      <Link 
        to={`/profile/${userId}`} 
        className="btn btn-primary"
        style={{textAlign: 'center'}}
        >
        View Profile
      </Link>
    </div>
  );
}

export default ProfileListUnit;
