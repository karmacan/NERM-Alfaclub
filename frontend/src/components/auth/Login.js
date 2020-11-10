import React from 'react'; 

import { useState } from 'react'; // state hook

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { userLogin } from '../../storage/auth/authDispetcher';

function Login(props) {
  ////////////////////////////////////////
  // STATE HOOK

  const [
    formData, /* == state.formData */
    setFormData /* == setState({formData}) */
  ] = useState({
    /* Default vals */
    email: '',
    pass: ''
  });

  // Destruct
  const { 
    email, 
    pass 
  } = formData;

  ////////////////////////////////////////
  // EVENT HANDLERS

  const handOnChange = async (ev) => {
    const inputName = ev.target.name;
    const inputVal = ev.target.value;
    setFormData({...formData, [inputName]: inputVal});
  }

  const handOnSubmit = async (ev) => {
    ev.preventDefault();
    
    await props.userLogin(email, pass);
  }

  ////////////////////////////////////////
  // RETURN JSX

  if (props.isAuthed) return <Redirect to="/profile/dashboard" />
  
  return (
    <section className="case">
      <h1 className="txt-l txt-primary">Log In</h1>
      <p className="txt-m">
        <i className="fas fa-sign-in-alt"></i>
        &nbsp;Войдите в свой аккаунт
      </p>
      {/* LOGIN FORM */}
      <form className="dev-form">
        {/* Email */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Email" 
            //required 

            /* Assosiate input with variable */
            name='email' /* [ev.target.name] */
            value={ email } /* formData.name */
            onChange={ (ev) => handOnChange(ev) }
          />
        </div>
        {/* Pass */}
        <div className="dev-form-field">
          <input 
            type="password" 
            placeholder="Пароль" 
            //minLength="4" 

            name='pass'
            value={ pass }
            onChange={ (ev) => handOnChange(ev) }
          />
        </div>
        {/* Submit */}
        <div className="dev-form-field">
          <input 
            type="submit" 
            value="Войти" 
            className="btn btn-primary" 

            onClick={ (ev) => handOnSubmit(ev) }
          />
        </div>
      </form>
      <p className="my-1">
        У вас нет аккаунта?
        &nbsp;<Link to="/signup">Зарегистрироваться</Link>
      </p>
    </section>
  );
}

////////////////////////////////////////
// CONNECT REDUX

const mapStateToProps = rootState => {
  return {
    isAuthed: rootState.authReducer.isAuthed
  };
};

const mapDispatcherToProps = {
  userLogin
};

export default connect(mapStateToProps, mapDispatcherToProps)(Login);
