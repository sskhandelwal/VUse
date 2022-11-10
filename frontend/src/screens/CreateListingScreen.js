import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/Dropdown'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function CreateListingScreen() {
  const { id } = useParams()
  const productId = id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [itemLocation, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [itemImage, setImage] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { success:successUpdate } = productUpdate

  let navigate = useNavigate()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/myproducts')
   } else {
    if (!product.name || product._id !== Number(productId)) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setLocation(product.location)
      setEmail(product.email)
      setImage(product.image)
    }
   }

    
  }, [dispatch, product, productId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId,
      name, 
      price,
      description, 
      itemLocation, 
      email,
      itemImage,
      isBought: false
    }))
  }

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
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Item name</Form.Label>
          <Form.Control
            type = 'text'
            placeholder='Enter name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Item price</Form.Label>
          <Form.Control
            type = 'number'
            placeholder='Enter price...'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Item description</Form.Label>
          <Form.Control
            type = 'text'
            placeholder='Enter description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='location'>
          <Form.Label>Item location</Form.Label>
          <Form.Control
            type = 'text'
            placeholder='Enter location...'
            value={itemLocation}
            onChange={(e) => setLocation(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Contact email</Form.Label>
          <Form.Control
            type = 'text'
            placeholder='Enter email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Item image</Form.Label>
          <Form.Control
            type = 'text'
            placeholder='Enter image...'
            value={itemImage}
            onChange={(e) => setImage(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button
                  type='submit'
                  variant='outline-warning'
                  className='button rounded textColor'
              >
                  Confirm
          </Button>
        </Form>


      <div className='buy-now-listing'>

      </div>
      <div className='auction-listing'>

      </div>
    </div>
  )
}

export default CreateListingScreen