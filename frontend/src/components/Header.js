import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const dispatch = useDispatch()
  
  const logoutHandler = () => {
    dispatch(logout())
  }

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
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/myproducts'>
                <NavDropdown.Item>
                  My Products
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/orders'>
                <NavDropdown.Item>
                  My Orders
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
            </NavDropdown>
          ) : (
            // Link to login page
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer> 
          )
        }
      </Nav>
      {/* This is where the search box is displayed */}
      <SearchBox />
    </Navbar>
  )
}

export default Header