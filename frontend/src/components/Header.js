import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function Header() {

  const dispatch = useDispatch()


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const productCreate = useSelector(state => state.productCreate)
  const { success: successCreate, product:createdProduct } = productCreate  

  let navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (successCreate) {
      navigate(`/product/${createdProduct._id}/edit`)
    }

  }, [dispatch, successCreate, createdProduct])

  
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  
  const createListingHandler = () => {
    if (window.confirm('Are you sure you want to create a product?')) {
      dispatch(createProduct())
    } else {
      navigate(this.props.navigation.state.routeName)
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  
  

  return (
    <div>
      {/* Navbar options change depending whether user is logged in */}
      {userInfo ? (
        <Navbar className='navbar-custom'>
          {/* VUSE links to home */}
          <LinkContainer to='/home'>
            <Navbar.Brand>
              VUse
            </Navbar.Brand>
          </LinkContainer>

          {/* Navigation to other pages */}
          <Nav className='ml-auto'>
            {/* Link to cart page */}
            <LinkContainer to='/cart'>
              <Nav.Link>
                Cart
              </Nav.Link>
            </LinkContainer>

            {/* Dropdown to all other pages */}
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
              <NavDropdown.Item onClick={createListingHandler}>
                Create Listing
              </NavDropdown.Item>
              <LinkContainer to='/'>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>

          {/* Search box to search for items */}
          <SearchBox/>
        </Navbar>
      ) : (
        <Navbar className='navbar-custom'>
          {/* VUSE links to landing */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              VUse
            </Navbar.Brand>
          </LinkContainer>

          {/* Navigation to other pages */}
          <Nav className='ml-auto'>
            {/* Link to login page */}
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer> 
          </Nav>
          </Navbar>
      )}
    </div>
  )
}

export default Header