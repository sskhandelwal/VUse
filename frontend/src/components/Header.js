import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function Header() {

  const dispatch = useDispatch()


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false)

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
    setShow(false)
    dispatch(createProduct())
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const createListingHandler = () => {
    handleShow();
    
  
  console.log(show);
    {/* <Button variant="primary" onClick={handleShow}>
    Create listing
  </Button> */}

    <Modal show={show} onHide={handleClose}>
    
      <Modal.Header closeButton>
        <Modal.Title>Create a Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>Would you like to create a listing?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={createProductHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
    
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