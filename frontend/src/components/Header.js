import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'

function Header() {
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>VUse</Navbar.Brand>
          </LinkContainer>
          <SearchBox />
          <Nav className="me-auto">
          <LinkContainer to='/cart'>
            <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/login'>
            <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
          </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header