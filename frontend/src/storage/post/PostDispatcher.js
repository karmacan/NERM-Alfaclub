import { setAlert } from '../_layouts/layoutsDispatcher'; // use inside dispatch

export const getPosts = () => {
  return async (dispatch) => {
    const url = 'http://localhost:5000/api/posts';
    const opts = {
      headers: {
        'user-token': localStorage.getItem('user_token')
      }
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();
      
      dispatch({
        type: 'GET_POST_LIST',
        payload: resBody
      });
    }
    catch (er) {
      dispatch({
        type: 'GET_POSTS_ERROR',
        payload: er
      })
    }
  }
}

export const deletePost = (postId) => {
  return async (dispatch) => {
    const url = `http://localhost:5000/api/user/post/${postId}`;
    const opts = {
      method: 'delete',
      headers: {
        'user-token': localStorage.getItem('user_token')
      }
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();

      if (res.status !== 200) throw resBody;

      dispatch({
        type: 'ON_POST_DELETE',
        payload: resBody
      });
    }
    catch (er) {
      if (er.errors) {
        er.errors.map(er => dispatch(setAlert('danger', er.msg)));
      }
    }
  }
}

export const likePost = (postId) => {
  return async (dispatch) => {
    const url = `http://localhost:5000/api/user/post/${postId}/like`;
    const opts = {
      method: 'put',
      headers: {
        'user-token': localStorage.getItem('user_token')
      }
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();

      dispatch({
        type: 'ON_LIKE_UPDATE',
        payload: resBody
      });
    }
    catch (er) {
      dispatch({
        type: 'LIKE_POST_ERROR',
        payload: er
      });
    }
  }
}

export const submitPost = (newPost) => {
  return async (dispatch) => {
    const url = `http://localhost:5000/api/user/post`;
    const opts = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem('user_token')
      },
      body: JSON.stringify(newPost)
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();

      if (res.status !== 200) throw resBody;

      dispatch({
        type: 'ON_SUBMIT_POST',
        payload: resBody
      });
    }
    catch (er) {
      if (er.errors) {
        er.errors.map(er => dispatch(setAlert('danger', er.msg)));
      }
    }
  }
}