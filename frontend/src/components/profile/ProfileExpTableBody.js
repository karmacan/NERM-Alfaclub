import React from 'react';

import { connect } from 'react-redux';
import { expDelete } from '../../storage/profile/profileDispatcher';

function ProfileExpTableBody(props) {
  const {
    exp: {
      _id,
      company,
      position,
      desc,
      from, /* string */
      to, /* string */
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
    props.expDelete(_id);
  }

  return (
    <tr>
      <td>{ company }</td>
      <td className="hidden-s">{ position }</td>
      <td className="hidden-s">{ desc }</td>
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

export default connect(null, { expDelete })(ProfileExpTableBody);
