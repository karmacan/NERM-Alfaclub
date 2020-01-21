import React, { Fragment } from 'react';

import shortid from 'shortid';
import ProfileExpTableBody from './ProfileExpTableBody';

function ProfileExpTable(props) {
  const mapProfileJobExp = () => {
    return props.profile.currentProfile.jobExp.map(exp => <ProfileExpTableBody key={shortid.generate()} exp={exp} />);
  }

  return (
    <Fragment>
      <h2 className="my-1">Experience Credentials</h2>
      <table className="dev-table my-1">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hidden-s">Title</th>
            <th className="hidden-s">Description</th>
            <th className="hidden-s">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { mapProfileJobExp() }
        </tbody>
      </table>
    </Fragment>
  );
}

export default ProfileExpTable;
