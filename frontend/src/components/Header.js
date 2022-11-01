import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'

function Header() {
  const userInfo = true;

  return (
    <Navbar className='navbar-custom'>
      {/* VUSE Home Link */}
      <LinkContainer to='/'>
        <Navbar.Brand>
          VUse
        </Navbar.Brand>
      </LinkContainer>

      {/* Navigation to other pages */}
      <Nav className='ml-auto'>
        <LinkContainer to='/createlisting'>
          <Nav.Link>
            Create Listing
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to='/cart'>
          <Nav.Link>
            Cart
          </Nav.Link>
        </LinkContainer>

        {/* If user is logged in, display dropdown */}
        {/* Else, display link to login page */}
        {
          userInfo ? (
            // Dropdown menu
            <NavDropdown title='User Info'>
              <LinkContainer to='/login'>
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/login'>
                <NavDropdown.Item>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : (
            // Link to login page
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer> 
          )
        }
      </Nav>
      <SearchBox />
    </Navbar>
  )
}

export default Header