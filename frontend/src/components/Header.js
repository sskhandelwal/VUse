import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Modal from 'react-bootstrap/Modal';

function Header() {

  const dispatch = useDispatch()


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const productCreate = useSelector(state => state.productCreate)
  const { success: successCreate, product:createdProduct } = productCreate
  
  const [isAuction, setIsAuction] = useState(false)

  let navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (successCreate && !isAuction) {
      navigate(`/product/${createdProduct._id}/edit`)
    }
    if (successCreate && isAuction) {
      navigate(`/auctionproduct/${createdProduct._id}/edit`)
    }

  }, [dispatch, successCreate, createdProduct])

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  
  const createListingHandler = () => {
    if (window.confirm('Are you sure you want to create a product?')) {
      setIsAuction(false)
      handleClose()
      dispatch(createProduct())
    } else {
      navigate(this.props.navigation.state.routeName)
    }
  }
  const createAuctionHandler = () => {
    if (window.confirm('Are you sure you want to create an auctionable product?')) {
      setIsAuction(true)
      handleClose()
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
              V-Use
            </Navbar.Brand>
          </LinkContainer>

          {/* Search box to search for items */}
          <SearchBox/>

          {/* For Spacing Purposes */}
          <Container></Container>

          {/* Navigation to other pages */}
          <Nav className='ml-auto' style={{paddingRight: '5%'}}>
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
              {userInfo.isAdmin ?
              (
                <LinkContainer to='/adminscreen'>
                  <NavDropdown.Item>
                    Admin: See All Products
                  </NavDropdown.Item>
                </LinkContainer>
              ) : (
                ''
              )}
              
              <NavDropdown.Item onClick={handleShow}>
                Create Listing
              </NavDropdown.Item>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Choose the Item You Would Like to Create!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={createAuctionHandler}>
                    Auction Item
                  </Button>
                  <Button variant="primary" onClick={createListingHandler}>
                    Normal Item
                  </Button>
                </Modal.Footer>
              </Modal>
              <LinkContainer to='/'>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
      ) : (
        <Navbar className='navbar-custom'>
          {/* VUSE links to landing */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              VUse
            </Navbar.Brand>
          </LinkContainer>

          {/* For Spacing Purposes */}
          <Container></Container>

          {/* Navigation to other pages */}
          <Nav className='ml-auto' style={{paddingRight: '5%'}}>
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