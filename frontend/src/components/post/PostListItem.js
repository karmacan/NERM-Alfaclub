import React from 'react';

import Moment from 'react-moment';

import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { helpProfileGetByUserId } from '../../config/helpers';

import { connect } from 'react-redux';
import { profileGetByUserId } from '../../storage/profile/profileDispatcher';

function PostListItem(props) {
  const history = useHistory();

  const {
    _id, /* post id */
    user: userId, /* post user */
    avatar: gravatar,
    userName,
    text,
    date,
    comments,
    likes
  } = props.post;

  const handOnAvatarClick = async () => {
    const profile = await helpProfileGetByUserId(userId);
    if (profile) {
      props.profileGetByUserId(userId);
      history.push(`/profile/${profile._id}`);
    }
  }

  const ifPostLikedByAuthUser = () => {
    const like = likes.find(like => like.user === props.auth.user._id);
    if (like) return 'btn btn-primary';
    return 'btn btn-light';
  }

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

  return (
    <div className="dev-post card bg-light my-1 p-1">

      {/* USER */}
      <div>
        <div>
          <img
            className="img img-round"
            src={gravatar}
            alt=""
            onClick={ev => handOnAvatarClick(ev)}
          />
          <h4>{userName}</h4>
        </div>
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
          {/* {console.log(<Link to={`/post/${_id}`} className="btn btn-dark">Discussion</Link>) } */}
          <Link to={`/post/${_id}`} className="btn btn-dark">
            Обсуждение
          </Link>
          {/* Comments */}
          <div className="card">
            <i className="fas fa-comments"></i>
            &nbsp;{ comments.length }
          </div>
          {/* Likes */}
          <button 
            className={ ifPostLikedByAuthUser() }
            onClick={ () => { 
              props.likePost(_id);
              
            }}
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
  profileGetByUserId
}

export default connect(mapStateToProps, mapDispatcherToProps)(PostListItem);
