import { setAlert } from '../_partials/partialsDispatcher'; // use inside dispatch

export const userSignup = (name, email, pass) => {
  return async (dispatch) => {
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

    const url = 'http://localhost:5000/api/user/singup';

    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();
      
      if (resBody.errors) throw resBody /* as er */;
      
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: resBody
      });
    }
    catch (er) {
      console.log(er.errors);
      er.errors.forEach(error => 
        dispatch(setAlert('danger', error.msg))
      );

      dispatch({
        type: "SIGNUP_FAILURE"
      });
    }
    
  }
}