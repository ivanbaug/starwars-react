import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" id="header">
      <Container>
        <h1 className="logo">Demo APP</h1>
        {userInfo && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto ">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
