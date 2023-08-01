import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NavBar() {
  let navigate = useNavigate();
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    console.log(window.localStorage.getItem("token"));
    navigate(`/login`);
  };
  return (
    <div>
      <Navbar bg="light" expand="lg" className="mx-4">
        <Navbar.Brand href="/">Memoizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          {localStorage.getItem("token") ? (
            <Button className="btn btn-primary" onClick={handleLogOut}>
              LogOut
            </Button>
          ) : (
            <Form className="d-flex">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} className="btn-outline-lighr" to="/signup">
                Sign-up
              </Nav.Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
