import { setAlert } from '../_layouts/layoutsDispatcher'; // use inside dispatch

export const profileGet = () => {
  return async (dispatch) => {
    const url = 'http://localhost:5000/api/user/profile';
    const opts = {
      headers: {
        'user-token': localStorage.getItem('user_token')
      }
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();
      if (resBody.errors) throw resBody;
      //console.log(resBody);
      dispatch({
        type: 'GET_USER_PROFILE',
        payload: resBody
      });
    }
    catch (er) {
      er.errors ? console.log(er.errors[0]) : console.log(er);
      dispatch({
        type: 'USER_PROFILE_ERROR',
        payload: er.errors ? er.errors[0] : er
      });
    }
  };
}

export const profilePost = (formData, history, isEdit = false) => {
  return async (dispatch) => {
    formData = {
      profession: formData.profession,
      expLvl: formData.expLvl,
      skills: formData.skills,
      bio: formData.bio,
      webLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        facebook: formData.facebook
      }
    };

    const url = 'http://localhost:5000/api/user/profile';
    const opts = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem('user_token')
      },
      body: JSON.stringify(formData)
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();

      if (resBody.errors) throw resBody;

      dispatch({
        type: 'POST_USER_PROFILE',
        payload: resBody
      });

      dispatch(setAlert('success', isEdit ? 'Profile updated!' : 'Profile Created!'));

      /*REDIRECT*/ history.push('/profile/dashboard');
    }
    catch (er) {
      if (er.errors !== undefined) {
        er.errors.forEach(error => 
          dispatch(setAlert('danger', error.msg))
        );
      }
    }
  };
}

export const eduAdd = (formData, history) => {
  return async (dispatch) => {
    const url = 'http://localhost:5000/api/user/profile/education';
    const opts = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem('user_token')
      },
      body: JSON.stringify(formData)
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();

      if (resBody.errors) throw resBody;

      dispatch({
        type: 'ADD_TO_PROFILE',
        payload: resBody
      });

      dispatch(setAlert('success', 'Education added!'));

      /*REDIRECT*/ history.push('/profile/dashboard');
    }
    catch (er) {
      if (er.errors !== undefined) {
        er.errors.forEach(error => 
          dispatch(setAlert('danger', error.msg))
        );
      }
    }
  }
}

export const expAdd = (formData, history) => {
  return async (dispatch) => {
    const url = 'http://localhost:5000/api/user/profile/job_exp';
    const opts = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem('user_token')
      },
      body: JSON.stringify(formData)
    };
    try {
      const res = await fetch(url, opts);
      const resBody = await res.json();

      if (resBody.errors) throw resBody;

      dispatch({
        type: 'ADD_TO_PROFILE',
        payload: resBody
      });

      dispatch(setAlert('success', 'Expirience added!'));

      /*REDIRECT*/ history.push('/profile/dashboard');
    }
    catch (er) {
      if (er.errors !== undefined) {
        er.errors.forEach(error => 
          dispatch(setAlert('danger', error.msg))
        );
      }
    }
  }
}