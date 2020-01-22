import React from 'react';
import { Fragment } from 'react';

import shortid from 'shortid';

import { Link } from 'react-router-dom';
import Spinner from '../_layouts/Spinner';

import { connect } from 'react-redux';
import { profileGetByUserId } from '../../storage/profile/profileDispatcher';

class ProfileView extends React.Component {
  componentDidMount() {
    this.props.profileGetByUserId(this.props.match.params.user_id);
  }

  ifWebLinks = () => {
    try {
      const {
        webLinks: {
          github,
          linkedin,
          facebook
        }
      } = this.props.profile.currentProfile;
      
      // SUM JSX ELEMENTS (with array push)
      const jsx = [];
      if (github) jsx.push(
        <a href={github} key={shortid.generate()}>
          <i className="fab fa-github fa-2x"></i>
        </a>
      );
      if (linkedin) jsx.push(
        <a href={linkedin} key={shortid.generate()}>
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      );
      if (facebook) jsx.push(
        <a href={facebook} key={shortid.generate()}>
          <i className="fab fa-facebook fa-2x"></i>
        </a>
      );
      
      return jsx;
    }
    catch (er) {
      return null;
    }
  }

  ifBio = () => {
    try {
      const { bio } = this.props.profile.currentProfile;
      if (bio !== undefined && bio === '') return (
        <Fragment>
          <div>
            <h2 className="txt-primary">Personal Bio</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse voluptatum dicta in cum adipisci ut consectetur delectus suscipit molestias?</p>
          </div>
          <div className="line-x"></div>
        </Fragment>
      );
    }
    catch (er) {
      return null;
    }
  }

  mapSkills = () => {
    try {
      const { skills } = this.props.profile.currentProfile;
      return skills.map(skill => (
        <div className="p-1" key={shortid.generate()}>
          <i className="fas fa-star"></i>
          &nbsp;{ skill }
        </div>
      ));
    }
    catch (er) {
      return null;
    }
  }

  setDate = (e) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { from, to, current } = e;
    const _from = new Date(from);
    const _to = new Date(to);
    if (!current) return `${months[_from.getMonth()]} ${_from.getYear() + 1900} - ${months[_to.getMonth()]} ${_to.getYear() + 1900}`;
    else return `${months[_from.getMonth()]} ${_from.getYear() + 1900} - Current`;
  }

  ifEduThenMap = () => {
    try {
      const { education } = this.props.profile.currentProfile;
      if (education === null && education.lenght === 0) return null;
      
      // INSERT JSX (one into other) [from inner to outer]
      const xEducation = education.map(edu => (
        <div key={shortid.generate()}>
          <h3>{ edu.place }</h3>
          <p>{ this.setDate(edu) }</p>
          <p><strong>Field Of Study: </strong> { edu.majoringIn }</p>
          { edu.degree !== undefined && edu.degree !== '' ? <p><strong>Degree: </strong> { edu.degree }</p> : null }
        </div>
      ));
      return (
        <div className="grid-profile-edu card p-2">
          <h2 className="txt-primary">Education</h2>
          { xEducation }
        </div>
      );
    }
    catch (er) {
      return null;
    }
  }

  ifExpThenMap = () => {
    try {
      const { expJob } = this.props.profile.currentProfile;
      if (expJob === null && expJob.lenght === 0) return null;
      
      // INSERT JSX (one into other) [from inner to outer]
      const xExpJob = expJob.map(exp => (
        <div key={shortid.generate()}>
          <h3>{ exp.company }</h3>
          <p>{ this.setDate(exp) }</p>
          <p><strong>Position: </strong> { exp.position }</p>
          { exp.desc !== undefined && exp.desc !== '' ? <p><strong>Description: </strong> { exp.desc }</p> : null }
        </div>
      ));
      return (
        <div className="grid-profile-exp card p-2">
          <h2 className="txt-primary">Experiences</h2>
          { xExpJob }
        </div>
      );
    }
    catch (er) {
      return null;
    }
  }

  render() {
    try {
      if (this.props.profile.isLoading) return <Spinner />;

      // Destruct
      const {
        user: {
          name,
          avatar: gravatar
        },
        profession,
        expLvl
      } = this.props.profile.currentProfile;
    

      return (
        <section className="case">
          { console.log(this.props.profile.currentProfile) }
          <Link to="/profiles" className="btn btn-gray">
            <i className="fas fa-chevron-left"></i>
            &nbsp;Back To Profiles
          </Link>
    
          <div className="grid-profile">
            {/* INFO */}
            <div className="grid-profile-info bg-primary p-2">
              <div className="mx-1">
                <h1 className="txt-l">{ name }</h1>
                <h1 className="txt-m">{ profession }</h1>
                <p>{ expLvl }</p>
                {/* Web Links */}
                <div className="my-1">
                  { this.ifWebLinks() }
                </div>
              </div>
              {/* Avatar */}
              <img 
                alt=""
                src={ gravatar } 
                className="img img-round" 
              />
            </div>
    
            {/* ABOUT */}
            <div className="grid-profile-about bg-light p-2">
              {/* Bio */}
              { this.ifBio() }
    
              {/* Skills */}
              <h2 className="txt-primary">Skill Set</h2>
              <div className="dev-skills row row-center">
                { this.mapSkills() }
              </div>
            </div>
    
            {/* EDU */}
            { this.ifEduThenMap() }
            
            {/* EXP */}
            { this.ifExpThenMap() }
    
            {/* REPOS */}
            <div className="grid-profile-repos">
              <h2 className="txt-primary my-1">
                <i className="fab fa-github"></i>
                &nbsp;Github Repos
              </h2>
              {/* Repo 1 */}
              <div className="grid-profile-repos-unit card my-1 p-1">
                <div>
                  <h4><Link to="#">Repo One</Link></h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, tenetur.</p>
                </div>
                {/* Repo Stats */}
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 20</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
              {/* Repo 2 */}
              <div className="grid-profile-repos-unit card my-1 p-1">
                <div>
                  <h4><Link to="#">Repo Two</Link></h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, tenetur.</p>
                </div>
                {/* Repo Stats */}
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 20</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
            </div>
    
          </div>
        </section>
      );
    }
    catch (er) {
      //console.log(er);
      return <Spinner />;
    }
  }
  
}

const mapStateToProps = (rootState) => ({
  profile: rootState.profileReducer
});

const mapDispetcherToProps = {
  profileGetByUserId
};

export default connect(mapStateToProps, mapDispetcherToProps)(ProfileView);
