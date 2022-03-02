import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'


const Header = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" id='header'>
      <Container >
        <h1 className="logo">Demo APP</h1>
        {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto ">
            <Nav.Link href="#home">Login</Nav.Link>
            <Nav.Link href="#link">List</Nav.Link>
            <Nav.Link href="#link2">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header