import React from 'react'
import { ReactComponent as HomeSVG } from "../svg/home.svg";
import { ReactComponent as EmployeeSVG } from "../svg/employees.svg";
import { ReactComponent as DepartmentSVG } from "../svg/department.svg";
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  return (
    <React.Fragment>
    <div className="display-3 d-flex justify-content-center mt-5 mb-n3"><Link to={'/'}><HomeSVG/></Link></div>
    <span className='bold d-flex justify-content-center mt-6 mb-n6'>CHOOSE ONE</span>
    <div className="icon display-3 d-flex justify-content-center mt-5 mb-n3"><Link to={'/department'}><DepartmentSVG/></Link></div>
    <div className="icon display-3 d-flex justify-content-center mt-5 mb-n3"><Link to={'/employees'}><EmployeeSVG/></Link></div>
    </React.Fragment>
  )
}

export default Home