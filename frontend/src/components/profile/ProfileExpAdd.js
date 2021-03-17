import React from 'react';

import { useState } from 'react';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // allows to access props.history to redirect

import { connect } from 'react-redux';
import { expAdd } from '../../storage/profile/profileDispatcher';

function ProfileExpAdd(props) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    desc: '',
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
    props.expAdd(formData, props.history);
  }

  return (
    <section className="case">
      <div className="my-2">
        <Link to="/profile/dashboard" className="btn btn-gray">
          <i className="fas fa-chevron-left"></i>
          &nbsp;Назад к дашборду
        </Link>
      </div>

      <p className="txt-m">
        <i className="fas fa-coins"></i>
        &nbsp;Добавить опыт работы
      </p>
      <p className="txt-s">
        &nbsp;Add any developer/programming positions that you have had in the past
      </p>
    
      <form className="dev-form">
        {/* Company */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Company Name" 
            name="company" 
            value={formData.company}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* Position */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Job Position" 
            name="position" 
            value={formData.position}
            onChange={(ev) => handOnChange(ev)}
          />
        </div>
        {/* Desc */}
        <div className="dev-form-field">
          <textarea
            placeholder="Job Description"
            name="desc"
            value={formData.desc}
            onChange={(ev) => handOnChange(ev)}
          ></textarea>
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
          <p>Current Job</p>
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
  expAdd
};

export default connect(null, mapDispetcherToProps)(withRouter(ProfileExpAdd));