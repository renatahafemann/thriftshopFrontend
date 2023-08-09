import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CookiesProvider, useCookies } from "react-cookie";

function Topbar() {
  const [cookies, setCookies] = useCookies(["client"]);

  const handleLogout = () => {
    var d = new Date("2/1/22");  
    setCookies("client", {...cookies}, { path: "/", expires: d });
  }
  
  return (
    <CookiesProvider>
      <Navbar expand="lg" className="bg-body-tertiary themeColor">
        <Container>
          <Navbar.Brand href="/">Kid's thrift store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div className="d-flex justify-content-end">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {cookies.client ? <Navbar.Brand href="/">Welcome {cookies.client.firstName}</Navbar.Brand> : null}
            { cookies.client ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : <Nav.Link href="/login">Login/Sign up</Nav.Link>  }           
              <Nav.Link href="/favorites">Favorites</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </CookiesProvider>
  );
}

export default Topbar;