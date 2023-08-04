import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Topbar({isLogged}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Kid's thrift store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="d-flex justify-content-end">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          { isLogged ? <Nav.Link href="#">Logout</Nav.Link> : <Nav.Link href="/login">Login/Sign up</Nav.Link>  }           
            <Nav.Link href="/favorites">Favorites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default Topbar;