import React from 'react';

import { useHistory } from 'react-router-dom';

import Moment from 'react-moment';

import { connect } from 'react-redux';
import { profileGetByUserId } from '../../storage/profile/profileDispatcher';

import { helpProfileGetByUserId } from '../../config/helpers';

function PostDiscussionComment(props) {
  const history = useHistory();

  const {
    _id, /* comment id */
    user: userId, /* comment user id */
    avatar,
    userName,
    text,
    date
  } = props.comment;

  const handOnAvatarClick = async () => {
    const profile = await helpProfileGetByUserId(userId);
    if (profile) {
      props.profileGetByUserId(userId);
      history.push(`/profile/${profile._id}`);
    }
  }

  const ifCommentUserIsAuthUser = () => {
    if (userId === props.auth.user._id) return (
      <button
        className="btn btn-danger"
        onClick={() => props.deleteComment(props.postId, _id)}
        >
        <i className="fas fa-trash"></i>
      </button>
    );
  }

  return (
    <div className="dev-comment bg-light my-1 p-1">
      <div>
        <div>
          <img
            className="img"
            src={ avatar }
            alt=""
            onClick={ev => handOnAvatarClick(ev)}
          />
          <h4>{ userName }</h4>
        </div>
      </div>
      <div>
        <p className="my-1">
          { text }
        </p>
        {/* Date */}
        <div className="my-1">
          <p className="txt-s">Posted on <Moment format='DD/MM/YYYY'>{date}</Moment></p>
        </div>
      </div>
      {/* Buttons */}
      <div className="dev-comment-btns">
        {/* Delete */}
        { ifCommentUserIsAuthUser() }
      </div>
    </div>
  );
}

const mapStateToProps = (rootState) => ({
  auth: rootState.authReducer,
});

const mapDispatcherToProps = {
  profileGetByUserId
}

export default connect(mapStateToProps, mapDispatcherToProps)(PostDiscussionComment);
