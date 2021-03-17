import React from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // allows to access props.history to redirect

import Moment from 'react-moment';

import shortid from 'shortid';

import Spinner from '../_layouts/Spinner';
import PostDiscussionComment from './PostDiscussionComment';

import { connect } from 'react-redux';
import { getPostById } from '../../storage/post/PostDispatcher';
import { likePost } from '../../storage/post/PostDispatcher';
import { deletePost } from '../../storage/post/PostDispatcher';
import { submitComment } from '../../storage/post/PostDispatcher';
import { deleteComment } from '../../storage/post/PostDispatcher';
import { profileGetByUserId } from '../../storage/profile/profileDispatcher';

import { helpProfileGetByUserId } from '../../config/helpers';

function PostDiscussion(props) {
  const history = useHistory();

  const [
    newComment,
    setNewComment
  ] = useState({
    text: ''
  });

  useEffect(() => {
    if (!props.post.currentPost) props.getPostById(props.match.params.post_id);
    //console.log(props.post.currentPost);
  });

  const handOnAvatarClick = async () => {
    const profile = await helpProfileGetByUserId(userId);
    if (profile) {
      props.profileGetByUserId(userId);
      history.push(`/profile/${profile._id}`);
    }
  }

  if (!props.post.currentPost) return <Spinner />

  const {
    _id, /* post id */
    user: userId, /* post user id */
    avatar,
    userName,
    text,
    date,
    likes,
    comments
  } = props.post.currentPost;

  const ifPostLikedByAuthUser = () => {
    const like = likes.find(like => like.user === props.auth.user._id);
    if (like) return 'btn btn-primary';
    return 'btn btn-light';
  }

  const ifPostUserIsAuthUser = () => {
    if (userId === props.auth.user._id) return (
      <button
        className="btn btn-danger"
        onClick={() => props.deletePost(_id, props.history)}
      >
        <i className="fas fa-trash"></i>
      </button>
    );
  }

  const handOnSubmit = (ev) => {
    ev.preventDefault();
    //console.log(newComment);
    props.submitComment(_id, newComment);
    setNewComment({ ...newComment, text: '' });
  }

  const mapCommects = () => {
    if (!comments || comments.length === 0) return null;
    return comments.map(comment => <PostDiscussionComment comment={comment} postId={_id} deleteComment={props.deleteComment} key={shortid.generate()} />)
  }

  return (
    <section className="case">
      <div className="my-2">
        <Link to="/posts" className="btn btn-gray">
          <i className="fas fa-chevron-left"></i>
          &nbsp;Назад к постам
        </Link>
      </div>

      <p className="txt-m">
        <i className="fas fa-file"></i>
        &nbsp;Обсуждение поста
      </p>

      {/* Post */}
      <div className="dev-post card bg-dark card p-1 my-1">
        <div>
          <div>
            <img
              className="img img-round"
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
          {/* Buttons */}
          <div className="dev-post-btns">
            {/* Likes */}
            <button
              className={ ifPostLikedByAuthUser() }
              onClick={() => props.likePost(_id)}
              >
              <i className="fas fa-heart"></i>
              &nbsp;{likes.length}
            </button>
            {/* Delete */}
            { ifPostUserIsAuthUser() }
          </div>
        </div>
      </div>

      {/* Submit Comment */}
      <div className="">
        <form className="dev-form bg-light my-1 p-1">
          <div className="p-1 bg-primary">
            <h3>Leave A Comment</h3>
          </div>
          <div className="dev-form-field">
            <textarea 
              placeholder="..."
              name="text"
              value={newComment.text}
              onChange={(ev) => setNewComment({ ...newComment, [ev.target.name]: ev.target.value })}
              >
            </textarea>
          </div>
          <input 
            type="submit" 
            className="btn btn-gray" 
            value="Submit" 
            onClick={ev => handOnSubmit(ev)}
          />
        </form>
      </div>

      {/* Comments */}
      { mapCommects() }

    </section>
  );
}

const mapStateToProps = (rootState) => ({
  post: rootState.postReducer,
  auth: rootState.authReducer
});

const mapDispetcherToProps = {
  getPostById,
  likePost,
  deletePost,
  submitComment,
  deleteComment,
  profileGetByUserId
};

export default connect(mapStateToProps, mapDispetcherToProps)(withRouter(PostDiscussion));
