import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/Dropdown'
// import {useState, useEffect} from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import { createListing } from '../actions/productActions'
// import { getUserDetails } from '../actions/userActions'
// import FormContainer from '../components/FormContainer'

function CreateListingScreen() {
  // const [name, setName] = useState('')
  // const [price, setPrice] = useState('')
  // const [description, setDescription] = useState('')
  // const [itemLocation, setItemLocation] = useState('')
  // const [email, setEmail] = useState('')

  // const dispatch = useDispatch()

  // const userDetails = useSelector(state => state.userDetails)
  // const { error, loading, user } = userDetails

  // const createListing = useSelector(state => state.createListing)
  // const { error1, loading1, product } = createListing


  // const userLogin = useSelector(state => state.userLogin)
  // const { userInfo } = userLogin

  // let navigate = useNavigate()
  // useEffect(() => {
  //     if (!userInfo) {
  //         navigate('/login/')
  //     }
  // }, [userInfo])

  // const submitHandler = (e) => {
  //     e.preventDefault()
  //     dispatch(createListing({ 
  //       'user':user.name, 
  //       'name': name,
  //       'price': price,
  //       'description': description,
  //       'itemLocation': itemLocation,
  //       'email': email,
  //   }))
  // }

  

  return (
    <div>
      <Row>
        <Col>
          <DropdownButton title='Listing type'>
            <Dropdown.Item>
              Buy Now
            </Dropdown.Item>
            <Dropdown.Item>
              Auction
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <h1 className=''>
            Buy Now
          </h1>
        </Col>
        
      </Row>
      

      <br></br>

      {/* buy now listing form */}
      <Form.Group>
        <Form.Label>Item name</Form.Label>
        <Form.Control type='text' placeholder='Enter name...'/>
        <Form.Label>Item price</Form.Label>
        <Form.Control type='text' placeholder='Enter price...'/>
        <Form.Label>Item description</Form.Label>
        <Form.Control type='text' placeholder='Enter description...'/>
        <Form.Label>Item location</Form.Label>
        <Form.Control type='text' placeholder='Enter location...'/>
        <Form.Label>Contact email</Form.Label>
        <Form.Control type='email' placeholder='Enter email...'/>
        <Form.Label>Item picture 1</Form.Label>
        <Form.Control type='file' placeholder='Upload photo...'/>
        <Form.Label>Item picture 2</Form.Label>
        <Form.Control type='file' placeholder='Upload photo...'/>
        <Form.Label>Item picture 3</Form.Label>
        <Form.Control type='file' placeholder='Upload photo...'/>
      </Form.Group>
      {/* <Form onSubmit={submitHandler}>
        <Form.Group controlId='item-name'>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Item Name...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
                <Form.Label>Item Price</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Item Price...'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Item Description...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
                <Form.Label>Item Location</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Item Location...'
                    value={itemLocation}
                    onChange={(e) => setItemLocation(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button
                type='submit'
                variant='outline-warning'
                className='button rounded textColor'
            >
                Update
            </Button>

        </Form> */}

      <div className='buy-now-listing'>

      </div>
      <div className='auction-listing'>

      </div>
    </div>
  )
}

export default CreateListingScreen