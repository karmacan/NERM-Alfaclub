import React from 'react';

function ProfileExpTable() {
  return (
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
  );
}

export default ProfileExpTable;
