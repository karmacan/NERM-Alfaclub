import React from 'react';

import Moment from 'react-moment';

import { connect } from 'react-redux';

function PostDiscussionComment(props) {
  const {
    _id, /* comment id */
    user: userId, /* comment user id */
    avatar,
    userName,
    text,
    date
  } = props.comment;

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
  
}

export default connect(mapStateToProps, mapDispatcherToProps)(PostDiscussionComment);
