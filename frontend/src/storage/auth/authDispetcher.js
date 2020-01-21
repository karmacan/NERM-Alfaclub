import { setAlert } from '../_layouts/layoutsDispatcher'; // use inside dispatch

export const userSignup = (name, email, pass) => {
  return async (dispatch) => {
    const url = 'http://localhost:5000/api/user/singup';
    const opts = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, 
        email, 
        pass
      })
    };

    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();
      
      if (resBody.errors) throw resBody /* as er in catch */;
      
      dispatch({
        type: "AUTH_SUCCESS",
        payload: resBody
      });

      /*!!!*/dispatch(userLoad());
    }
    catch (er) {
      //console.log(er.errors);
      er.errors.forEach(error => 
        dispatch(setAlert('danger', error.msg))
      );

      dispatch({type: "AUTH_FAILURE"});
    }
    
  }
}

export const userLogin = (email, pass) => {
  return async (dispatch) => {
    const url = 'http://localhost:5000/api/user/login';
    const opts = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, 
        pass
      })
    };

    try {
      const res = await fetch(url, opts);

      const resBody = await res.json();
      
      if (resBody.errors) throw resBody /* as er in catch */;
      
      dispatch({
        type: "AUTH_SUCCESS",
        payload: resBody
      });

      /*!!!*/dispatch(userLoad());
    }
    catch (er) {
      //console.log(er.errors);
      er.errors.forEach(error => 
        dispatch(setAlert('danger', error.msg))
      );

      dispatch({type: "AUTH_FAILURE"});
    }
    
  }
}

export const userLoad = () => {
  return async (dispatch) => {
    // Check token on local storage
    if (!localStorage.user_token) {
      console.log('No token in storage!');
      return;
    }

    const url = 'http://localhost:5000/api/user/load';
    const opts = {
      method: 'get',
      headers: {
        'user-token': localStorage.user_token /* == localStorage.getItem('user_token') */
      }
    };

    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();
      if (resBody.errors) throw resBody;
      dispatch({
        type: "USER_LOAD",
        payload: resBody
      });
    }
    catch (er) {
      if (er.errors !== undefined) {
        er.errors.forEach(error => 
          dispatch(setAlert('danger', error.msg))
        );
      }

      dispatch({type: "AUTH_FAILURE"});
    }
  }
}

export const userLogout = () => {
  return (dispatch) => {
    dispatch({type: "AUTH_FAILURE"}); /* authReducer */
    dispatch({type: "USER_PROFILE_LOGOUT"}); /* profileReducer */
  }
}