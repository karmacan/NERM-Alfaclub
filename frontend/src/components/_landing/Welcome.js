import React from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

function Welcome(props) {
  if (props.isAuthed) return <Redirect to="/dashboard" />

  return (
    <div className="dev-landing">
      <div className="overlay-dark">
        <div className="dev-landing-inner">
          <h1 className="txt-l">Приветствуем в комманде!</h1>
          <p className="txt-m">Все специалисты в одном месте. Вступай в комманду AlfaStrah!</p>
          {/* Button Panel */}
          <div className="case">
            <Link 
              to="/signup" 
              className="btn btn-round btn-primary">
              Зарегистрироваться
            </Link>
            <Link 
              to="/login" 
              className="btn btn-round">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = rootState => {
  return {
    isAuthed: rootState.authReducer.isAuthed
  };
}

export default connect(mapStateToProps, null)(Welcome);
