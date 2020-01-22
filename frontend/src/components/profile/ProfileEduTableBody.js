import React from 'react';

import { connect } from 'react-redux';
import { eduDelete } from '../../storage/profile/profileDispatcher';

function ProfileEduTableBody(props) {
  const {
    edu: {
      _id,
      place,
      majoringIn,
      degree,
      from,
      to,
      current
    }
  } = props;

  const displayDate = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const _from = new Date(from);
    const _to = new Date(to);
    if (!current) return `${months[_from.getMonth()]} ${_from.getYear() + 1900} - ${months[_to.getMonth()]} ${_to.getYear() + 1900}`;
    else return `${months[_from.getMonth()]} ${_from.getYear() + 1900} - Current`;
  }

  const handOnDeleteClick = () => {
    //console.log(_id);
    props.eduDelete(_id);
  }

  return (
    <tr>
      <td>{ place }</td>
      <td className="hidden-s">{ majoringIn }</td>
      <td className="hidden-s">{ degree ? degree : '' }</td>
      <td className="hidden-s">
        { displayDate() }
      </td>
      <td>
        <button 
          className="btn btn-danger"
          onClick={() => handOnDeleteClick()}
          >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default connect(null, { eduDelete })(ProfileEduTableBody);
