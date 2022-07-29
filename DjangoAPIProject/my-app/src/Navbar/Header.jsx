import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {Navbar, Nav} from 'react-bootstrap';
import { ReactComponent as BaseSVG } from "../svg/base.svg";

let NavBar = () => {
    return (
  
        
      <Navbar className="navbar-light" expand="md" style={{backgroundColor: '#fcb103'}}>
      <div className="container">
              <LinkContainer to={'/'}>
                <Navbar.Brand>
              <i className="bi bi-asterisk" style={{color: "white"}}/> <BaseSVG/></Navbar.Brand></LinkContainer>
              
              {/* The <span style={{color: "white"}}>Base</span> */}
       
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <LinkContainer to="/department">
      <Nav.Link><span className="bold">Departments</span></Nav.Link>
      </LinkContainer>

      <LinkContainer to="/employees">
      <Nav.Link><span className="bold">Employees</span></Nav.Link>
      </LinkContainer>
              </Nav>
 
</Navbar.Collapse>
</div> 
</Navbar>
    


    )


};

export default NavBar;