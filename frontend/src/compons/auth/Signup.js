import React from 'react';

import { useState } from 'react'; // hook

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { alertDisplay } from '../../storage/_partials/partialsDispatcher;'

function Signup() {

  ////////////////////////////////////////
  // STATE HOOK

  const [
    formData, /* == state.formData */
    setFormData /* == setState({formData}) */
  ] = useState({
    /* Default vals */
    name: '',
    email: '',
    pass: '',
    repass: ''
  });

  // Destruct
  const { 
    name, 
    email, 
    pass, 
    repass 
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
    if (pass !== repass) { console.log('Passwords don\'t match!'); return; }

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

    const res = await fetch(url, opts);
    const resBody = await res.json();
    // console.log(resBody);
    
  }

  ////////////////////////////////////////
  // RETURN JSX

  return (
    <section className="case">
      <h1 className="txt-l txt-primary">Sign Up</h1>
      <p className="txt-m">
        <i className="fas fa-user-plus"></i>
        &nbsp;Create Your Account
      </p>
      {/* SIGNUP FORM */}
      <form className="dev-form">
        {/* Name */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Name" 
            required 
            autoComplete="off"

            /* Assosiate input with variable */
            name='name' /* [ev.target.name] */
            value={ name } /* formData.name */
            onChange={ (ev) => handOnChange(ev) }
          />
          <small className="txt-s">Enter your preferable name</small>
        </div>
        {/* Email */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Email" 
            required 

            name='email'
            value={ email }
            onChange={ (ev) => handOnChange(ev) }
          />
          <small className="txt-s">For auto avatar use your Gravatar email</small>
        </div>
        {/* Pass */}
        <div className="dev-form-field">
          <input 
            type="password" 
            placeholder="Password" 
            minLength="4" 

            name='pass'
            value={ pass }
            onChange={ (ev) => handOnChange(ev) }
          />
        </div>
        {/* Confirm Pass */}
        <div className="dev-form-field">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            minLength="4" 

            name="repass"
            value={ repass }
            onChange={ (ev) => handOnChange(ev) }            
          />
        </div>
        {/* Submit */}
        <div className="dev-form-field">
          <input 
            type="submit" 
            value="Submit" 
            className="btn btn-primary" 

            onClick={ (ev) => handOnSubmit(ev) }
          />
        </div>
      </form>
      <p className="my-1">
        Already have an account?
        &nbsp;<Link to="/login">Log In</Link>
      </p>
    </section>
  );
}

////////////////////////////////////////
// CONNECT REDUX

const mapStateToProps = {

};

const mapDispatcherToProps = {
  alertDisplay
};

export default connect(mapStateToProps, mapDispatcherToProps)(Signup);
