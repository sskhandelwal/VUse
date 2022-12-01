import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct, deleteProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function CreateAuctionScreen() {
  const { id } = useParams()
  const productId = id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [itemLocation, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [itemImage, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [initialBidPrice, setInitialBidPrice] = useState(0)
  const [date, setDate] = useState(new Date())
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const today = new Date()

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
      setInitialBidPrice(product.bid)
      setDescription(product.description)
      setLocation(product.location)
      setEmail(product.email)
      setImage(product.image)
    }
   }

    
  }, [dispatch, product, productId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    const allErrors = {}

    if (date <= today) {
      allErrors.date = "Select date after today"
    }

    if (Object.keys(allErrors) > 0) {
      setErrors(allErrors)
      setValidated(false)
    } else {
      setValidated(true)
      dispatch(updateProduct({
        _id: productId,
        name, 
        initialBidPrice,
        description, 
        itemLocation, 
        email,
        itemImage,
        isBought: false,
        boughtBy: product.boughtBy, 
        date
      }))
    }
  }

  const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this product?')) {
        dispatch(deleteProduct(id))
        navigate('/home')
    }
  }
  window.onpopstate = () => {
    if (window.confirm('This will delete the product. Are you sure you want to continue?')) {
      dispatch(deleteProduct(id))
    }
  }


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', productId)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/products/upload/', formData, config)

        setUploading(false)

    } catch (error) {
        setUploading(false)
    }
  }

  return (
    <div>
      <Row>
        <Col>
          <h1 className=''>
            Item Details (Auction)
          </h1>
        </Col>
        
      </Row>
      
      <br></br>

      {/* buy now listing form */}
      <Form validated={validated} onSubmit={submitHandler}>
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
          <Form.Label>Item Bid Price</Form.Label>
          <Form.Control
            type = 'number'
            placeholder='Enter initial bid price...'
            value={initialBidPrice}
            onChange={(e) => setInitialBidPrice(e.target.value)}
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
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={uploadFileHandler}/>
        </Form.Group>
        <Form.Group controlId="validationFormik03">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type = 'date'
            placeholder='Choose Date...'
            value={date}
            isInvalid={!!errors.date}
            onChange={(e) => setDate(e.target.value)}
            feedback="Error"
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
          <Button
                  variant='danger'
                  onClick={() => deleteHandler(product._id)}
              >
                  Delete
          </Button>
        </Form>
    </div>
  )
}

export default CreateAuctionScreen