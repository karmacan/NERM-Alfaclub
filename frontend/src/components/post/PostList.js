import React from 'react';

import './Post.css';

import shortid from 'shortid';

import PostListItem from './PostListItem';
import Spinner from '../_layouts/Spinner';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../../storage/post/PostDispatcher';
import { submitPost } from '../../storage/post/PostDispatcher';
import { likePost } from '../../storage/post/PostDispatcher';
import { deletePost } from '../../storage/post/PostDispatcher';
import { clearCurrentPost } from '../../storage/post/PostDispatcher';

function PostList(props) {
  const [ 
    newPost,
    setNewPost
  ] = useState({
    text: ''
  });

  useEffect(() => {
    if (props.post.isLoading) props.getPosts();
    if (props.post.currentPost) props.clearCurrentPost();
    //console.log(props.post.currentPost);
  });

  const mapPosts = () => {
    if (!props.post.posts) return null;
    return props.post.posts.map(post => <PostListItem post={post} deletePost={props.deletePost} likePost={props.likePost} key={shortid.generate()} />)
  }

  const handOnSubmit = (ev) => {
    ev.preventDefault();
    //console.log(newPost);
    props.submitPost(newPost);
    setNewPost({...newPost, text: ''})
  }

  if (props.post.isLoading) return <Spinner />;

  return (
    <section className="case">
      <div className="my-2">
        <Link to="/profile/dashboard" className="btn btn-gray">
          <i className="fas fa-chevron-left"></i>
          &nbsp;Назад к дашборду
        </Link>
      </div>

      <p className="txt-m">
        <i className="fas fa-copy"></i>
        &nbsp;Посты сообщества
      </p>

      {/* <!-- Submit Post --> */}
      <form className="dev-form bg-light my-1 p-1">
        <div className="p-1 bg-primary">
          <h4>Создать пост</h4>
        </div>
        <div className="dev-form-field">
          <textarea 
            placeholder="..."
            name="text"
            value={newPost.text}
            onChange={(ev) => setNewPost({ ...newPost, [ev.target.name]: ev.target.value })}
            >  
          </textarea>
        </div>
        <input 
          type="submit" 
          value="Submit" 
          className="btn btn-gray"
          onClick={ev => handOnSubmit(ev) }
        />
      </form>

      {/* { console.log(props.post.posts) } */}

      {/* Posts */}
      { mapPosts() }

    </section>
  );
}

const mapStateToProps = (rootState) => ({
  post: rootState.postReducer
});

const mapDispetcherToProps = {
  getPosts,
  deletePost,
  likePost,
  submitPost,
  clearCurrentPost
}

export default connect(mapStateToProps, mapDispetcherToProps)(PostList);
