import React from 'react';
import { Link } from 'react-router-dom';

function DashboardButtons() {
  return (
    <div className="dev-buttons my-1">
      <Link to="/profile/update" className="btn btn-gray" style={{marginRight: '1rem', textAlign: 'center'}}>
        <i className="fas fa-user-circle txt-primary" style={{float: 'left'}}></i>
        &nbsp;Редактировать Профайл
      </Link>
      <Link to="/profile/edu/add" className="btn btn-gray mx-1" style={{textAlign: 'center'}}>
        <i className="fas fa-graduation-cap txt-primary" style={{float: 'left'}}></i> 
        &nbsp;Добавить Образование
      </Link>
      <Link to="/profile/exp/add" className="btn btn-gray mx-1" style={{textAlign: 'center'}}>
        <i className="fab fa-black-tie txt-primary" style={{float: 'left'}}></i> 
        &nbsp;Добавить Опыт Работы
      </Link>
    </div>
  );
}

export default DashboardButtons;
