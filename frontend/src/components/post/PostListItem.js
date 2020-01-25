import React from 'react';

import { Link } from 'react-router-dom';

import Moment from 'react-moment';

import { connect } from 'react-redux';
import { likePost } from '../../storage/post/PostDispatcher';

function PostListItem(props) {
  const {
    _id,
    user: userId,
    avatar: gravatar,
    userName,
    text,
    date,
    comments,
    likes
  } = props.post;

  const ifPostUserIsAuthUser = () => {
    if (userId === props.auth.user._id) return (
      <button 
        className="btn btn-danger"
        onClick={() => props.deletePost(_id)}
        >
        <i className="fas fa-trash"></i>
      </button>
    );
  }

  const ifPostLikedByAuthUser = () => {
    const like = likes.find(like => like.user === props.auth.user._id);
    if (like) return 'btn btn-primary';
    return 'btn btn-light';
  }

  return (
    <div className="dev-post card bg-light my-1 p-1">

      {/* USER */}
      <div>
        <a href="profile.html">
          <img
            className="img img-round"
            src={ gravatar }
            alt=""
          />
          <h4>{ userName }</h4>
        </a>
      </div>
      {/* POST */}
      <div>
        {/* Text */}
        <p className="my-1">
          { text }
        </p>
        {/* Date */}
        <div className="my-1">
          <p className="txt-s">Posted on <Moment format='DD/MM/YYYY'>{ date }</Moment></p>
        </div>
        {/* Buttons */}
        <div className="dev-post-btns">
          {/* Discussion */}
          <Link to={`/post/${props.post._id}`} className="btn btn-primary">
            Discussion
          </Link>
          {/* Comments */}
          <div className="card">
            <i className="fas fa-comments"></i>
            &nbsp;{ comments.length }
          </div>
          {/* Likes */}
          <button 
            className={ ifPostLikedByAuthUser() }
            onClick={ () => props.likePost(_id) }
            >
            <i className="fas fa-heart"></i>
            &nbsp;{ likes.length }
          </button>
          {/* Delete */}
          { ifPostUserIsAuthUser() }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (rootState) => ({
  auth: rootState.authReducer
});

const mapDispatcherToProps = {
  likePost
}

export default connect(mapStateToProps, mapDispatcherToProps)(PostListItem);
