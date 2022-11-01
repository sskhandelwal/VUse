import React from 'react'
import SearchBox from './SearchBox'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Header() {
  return (
    <div className='topnav'>
      <LinkContainer to='/'>
          <Navbar.Brand>VUse</Navbar.Brand>
      </LinkContainer>
      {/* <a className='bold' href='/'>VUse</a> */}
      <SearchBox />
      <a href='/createlisting'>Create Listing</a>
      {/* <a href='/cart'>Cart</a> */}
      <LinkContainer to='/cart'>
          <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
      </LinkContainer>
      {/* <a href='/login'>Login</a> */}
      <LinkContainer to='/login'>
          <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
      </LinkContainer>
    </div>
  )
}

export default Header