import React from 'react'; 

import { useState } from 'react'; // hook

import { Link } from 'react-router-dom';

function Login() {

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

    const url = 'http://localhost:5000/api/user/login';

    const res = await fetch(url, opts);
    const resBody = await res.json();
    // console.log(resBody);
    
  }

  ////////////////////////////////////////
  // RETURN JSX
  
  return (
    <section className="case">
      <h1 className="txt-l txt-primary">Log In</h1>
      <p className="txt-m">
        <i className="fas fa-sign-in-alt"></i>
        &nbsp;Enter Your Account
      </p>
      {/* LOGIN FORM */}
      <form className="dev-form">
        {/* Email */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Email" 
            required 

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
            placeholder="Password" 
            minLength="4" 

            name='pass'
            value={ pass }
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
        Don't have an account?
        &nbsp;<Link to="/signup">Sign Up</Link>
      </p>
    </section>
  );
}

export default Login;
