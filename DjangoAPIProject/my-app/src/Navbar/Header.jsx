import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {Navbar, Nav} from 'react-bootstrap';

let NavBar = () => {
    return (
  
        
      <Navbar className="navbar-light" expand="md" style={{backgroundColor: '#fcb103'}}>
      <div className="container">
              <LinkContainer to={'/'}>
                <Navbar.Brand>
              <i className="bi bi-asterisk" style={{color: "white"}}/>  The <span style={{color: "white"}}>Base</span></Navbar.Brand></LinkContainer>
              
              
       
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <LinkContainer to="/department">
      <Nav.Link>Departments</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/employees">
      <Nav.Link>Employees</Nav.Link>
      </LinkContainer>
              </Nav>
 
</Navbar.Collapse>
</div> 
</Navbar>
    


    )


};

export default NavBar;