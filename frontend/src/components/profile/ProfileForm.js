import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; // allows to access props.history to redirect

import Spinner from '../_layouts/Spinner';

import { useState } from 'react';
import { useEffect } from 'react'; // lifecycle hook

import { connect } from 'react-redux';
import { profilePost } from '../../storage/profile/profileDispatcher';

function ProfileForm(props) {
  ////////////////////////////////////////
  // STATE HOOK

  const [formData, setFormData] = useState({
    profession: '',
    expLvl: '',
    skills: '',
    bio: '',
    github: '',
    linkedin: '',
    facebook: ''
  });

  const [isLinksDisplayed, setIsLinksDisplayed] = useState(false);

  ////////////////////////////////////////
  // EVENT HANDLERS

  const handOnChange = (target) => {
    if (target.name === 'expLvl') {
      
      target.className = target.options[target.selectedIndex].className; // style selected option
      target = {
        name: target.name,
        value: target.options[target.selectedIndex].innerText
      };
    }
    setFormData({
      ...formData,
      [target.name]: target.value
    });
    //console.log(formData);
  }

  const handOnSubmit = (ev) => {  
    ev.preventDefault();
    props.profilePost(formData, props.history, props.profile.currentProfile ? true : false);
  }

  ////////////////////////////////////////
  // DYNAMIC MARKUP

  const ifLinksDisplayed = () => {
    if (isLinksDisplayed) return (
      <Fragment>
        <div className="dev-form-field social-input">
          <i className="fab fa-github fa-2x"></i>
          <input 
            type="text" 
            placeholder="Github URL" 
            name="github" 
            value={formData.github}
            onChange={(ev) => handOnChange(ev.target)}
          />
        </div>
        <div className="dev-form-field social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input 
            type="text" 
            placeholder="Linkedin URL" 
            name="linkedin" 
            value={formData.linkedin}
            onChange={(ev) => handOnChange(ev.target)}
          />
        </div>
        <div className="dev-form-field social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input 
            type="text" 
            placeholder="Facebook URL" 
            name="facebook" 
            value={formData.facebook}
            onChange={(ev) => handOnChange(ev.target)}
          />
        </div>
      </Fragment>
    );
  }

  ////////////////////////////////////////
  // COMPONENT DID HOOK

  const stringifySkills = (skills) => {
    return skills.join(', '); // array to string with commas
  }

  useEffect(() => {
    const { currentProfile } = props.profile;
    if (!currentProfile) return;

    const {  
      profession,
      expLvl,
      skills,
      bio,
      webLinks
    } = currentProfile;

    if (!webLinks) {
      setFormData({
        profession,
        expLvl,
        skills: stringifySkills(skills),
        bio: bio ? bio : ''
      });
    }
    else {
      const { github, linkedin, facebook } = webLinks;
      setFormData({
        profession,
        expLvl,
        skills: stringifySkills(skills),
        bio: bio ? bio : '',
        github: github !== undefined ? github : '',
        linkedin: linkedin !== undefined ? linkedin : '',
        facebook: facebook !== undefined ? facebook : ''
      });
    }
    
  }, []);

  ////////////////////////////////////////
  // RETURN JSX

  // IF LOADING
  if (props.profile.isLoading) return <Spinner />

  return (
    <section className="case">
      {/* Back To Dashboard */}
      <div className="my-1">
        <Link to="/profile/dashboard" className="btn btn-gray">
          <i className="fas fa-chevron-left"></i>
          &nbsp;Back To Dashboard
        </Link>
      </div>

      {/* Section Header */}
      <p className="txt-m">
        <i className="fas fa-user"></i>
        &nbsp;Create Your Profile
      </p>

      <form className="dev-form">
        <p className="my-1 txt-m txt-primary">Required Fields</p>
        
        {/* Proffesion */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Profession" 
            name="profession" 
            value={formData.profession}
            onChange={(ev) => handOnChange(ev.target)}
          />
          <small className="form-text">
            * Tell us your professional major
          </small>
        </div>

        {/* ExpLvl (Select) */}
        <div className="dev-form-field">
          <select 
            //className='placeholder'
            className={ props.profile.currentProfile? '' : 'placeholder'}
            name="expLvl" 
            value={formData.expLvl}
            onChange={(ev) => handOnChange(ev.target)}
            >
            <option value="Placeholder" className="placeholder" hidden>Expirience Level</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Developer">Developer</option>
            <option value="Senior">Senior</option>
            <option value="Manager">Manager</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            * Tell us of about your expirience level (proffecional status)
          </small>
        </div>
        
        {/* Skills */}
        <div className="dev-form-field">
          <input 
            type="text" 
            placeholder="Skills" 
            name="skills" 
            value={formData.skills}
            onChange={(ev) => handOnChange(ev.target)}
          />
          <small className="form-text">
            * Write down your professional skills, separated by comma (eg HTML, CSS, JS)
          </small>
        </div>

        <div className="line-x"></div>
        <p className="my-1 txt-m txt-primary">Optional Fields</p>
        
        {/* Bio */}
        <div className="dev-form-field">
          <textarea 
            placeholder="Bio" 
            name="bio"
            value={formData.bio}
            onChange={(ev) => handOnChange(ev.target)}
            >  
          </textarea>
          <small className="form-text">
            * Share with us a little information about yourself (location, languages)
          </small>
        </div>
        
        {/* Web Links Button */}
        <div className="my-2">
          <button 
            type="button" 
            className="btn btn-light"
            onClick={() => setIsLinksDisplayed(!isLinksDisplayed)}
            >
            Add Social Network Links
          </button>
        </div>
        {/* Web Links */}
        { ifLinksDisplayed() }

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

////////////////////////////////////////
// CONNECT REDUX

const mapStateToProps = (rootState) => ({
  profile: rootState.profileReducer
});

const mapDispatcherToProps = {
  profilePost
};

export default connect(mapStateToProps, mapDispatcherToProps)(withRouter(ProfileForm));
