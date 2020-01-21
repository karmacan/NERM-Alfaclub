import React from 'react';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // allows to access props.history to redirect

import { connect } from 'react-redux';
import { eduAdd } from '../../storage/profile/profileDispatcher';

function ProfileEduAdd(props) {
  const [formData, setFormData] = useState({
    place: '',
    majoringIn: '',
    degree: '',
    from: '',
    to: '',
    current: false
  });

  const handOnChange = (ev) => {
    if (ev.target.name === 'current') {
      setFormData({
        ...formData,
        [ev.target.name]: !formData.current
      });
    }
    else {
      setFormData({
        ...formData,
        [ev.target.name]: ev.target.value
      });
    }
  }

  const handOnSubmit = (ev) => {
    ev.preventDefault();
    props.eduAdd(formData, props.history);
  }

  return (
    <section className="case">
      <div className="my-2">
        <Link to="/profile/dashboard" className="btn btn-gray">
          <i className="fas fa-chevron-left"></i>
          &nbsp;Back To Dashboard
        </Link>
      </div>

      <p className="txt-m">
        <i className="fas fa-graduation-cap"></i>
        &nbsp;Add Education
      </p>
      <p className="txt-s">
        &nbsp;Add any school/bootcamp that you have attended
      </p>
      
      <form className="dev-form">
        {/* Place */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Place Name" 
            name="place" 
            value={formData.place}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* Majoring In */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Majoring In" 
            name="majoringIn" 
            value={formData.majoringIn}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* Degree */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Degree" 
            name="degree"  
            value={formData.degree}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* From */}
        <div className="dev-form-field">
          <h4>From Date</h4>
          <input 
            type="date" 
            name="from" 
            value={formData.from}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* To */}
        <div className="dev-form-field">
          <h4>To Date</h4>
          <input 
            type="date" 
            disabled={formData.current ? true : false}
            name="to" 
            value={formData.to}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* Current */}
        <div className="dev-form-field">
          <p>Current Student</p>
          <input 
            type="checkbox" 
            name="current" 
            value={formData.current}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* Submit */}
        <input 
          type="submit" 
          className="btn btn-primary my-1" 
          onClick={(ev) => handOnSubmit(ev)}
        />
      </form>

    </section>
  );
}

const mapDispetcherToProps = {
  eduAdd
};

export default connect(null, mapDispetcherToProps)(withRouter(ProfileEduAdd));
