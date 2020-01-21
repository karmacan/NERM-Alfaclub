import React, { Fragment } from 'react';

import shortid from 'shortid';
import ProfileEduTableBody from './ProfileEduTableBody';

function ProfileEduTable(props) {
  const mapProfileEducation = () => {
    return props.profile.currentProfile.education.map(edu => <ProfileEduTableBody key={shortid.generate()} edu={edu} />);
  }

  return (
    <Fragment>
      <h2 className="my-1">Education Credentials</h2>
      <table className="dev-table my-1">
          <thead>
            <tr>
              <th>School</th>
              <th className="hidden-s">Majoring In</th>
              <th className="hidden-s">Degree</th>
              <th className="hidden-s">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { mapProfileEducation() }
          </tbody>
        </table>
      </Fragment>
  );
}

export default ProfileEduTable;
