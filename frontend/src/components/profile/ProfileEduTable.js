import React from 'react';

function ProfileEduTable() {
  return (
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
  );
}

export default ProfileEduTable;
