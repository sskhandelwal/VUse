import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct, deleteProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import {Box, Stack, Divider} from '@mui/material'

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
  const [hourInput, setUserHour] = useState(0)
  const [validated, setValidated] = useState(false)

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

    setValidated(true)
    // console.log(dateInput.toUTCString())
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
      isAuction: true,
      date: hourInput,
    }))
    
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
    <React.Fragment>
      <div>
        <h1 style={{textAlign: "center"}}>
          Item Details (Auction)
        </h1>
      
        <Form validated={validated} onSubmit={submitHandler}>
        
          <Stack   
            direction="column" justifyContent="center" alignItems="center" spacing={2} 
            divider={<Divider orientation="horizontal" flexItem />}>
            
  
            <Box
                sx={{
                  borderRadius: 1,
                  boxShadow: 1,
                  margin: 1,
                  padding: 5,
                  border: 1,
                  width: 1/2,
                  height: 1/4,
                  backgroundColor: '#E7EBEF'}}>
                <div class="form-group">
                <Form.Group controlId='name'>
                  <Form.Label>Item name</Form.Label>
                    <Form.Control
                      type = 'text'
                      placeholder='Enter name...'
                      value={name}
                      onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                </div>
                <br></br>
                <div class="form-group">
                <Form.Group controlId='price'>
                  <Form.Label>{"\n"}Starting Bid Price</Form.Label>
                  <Form.Control
                    type = 'number'
                    placeholder='Enter price...'
                    value={initialBidPrice}
                    onChange={(e) => setInitialBidPrice(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                </div>
                <br></br>
                <div class="form-group">
                <Form.Group controlId='description'>
                  <Form.Label>{"\n"}Item description</Form.Label>
                  <Form.Control
                    type = 'text'
                    placeholder='Enter description...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                </div>
                <br></br>
                <div class="form-group">
                <Form.Group controlId='location'>
                  <Form.Label>{"\n"}Item location</Form.Label>
                  <Form.Control
                    type = 'text'
                    placeholder='Enter location...'
                    value={itemLocation}
                    onChange={(e) => setLocation(e.target.value)}>
                  </Form.Control>
                </Form.Group>   
                </div>
                <br></br>
                <div class="form-group">
                <Form.Group controlId='email'>
                  <Form.Label>{"\n"}Contact email</Form.Label>
                  <Form.Control
                    type = 'email'
                    placeholder='Enter email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                </div>
                <br></br>
                <div class="form-group">
                <Form.Group controlId="validationFormik03">
                  <Form.Label>{"\n"}How many hours would you like the auctrion to be open for?</Form.Label>
                  <Form.Control
                    type = 'number'
                    placeholder='Enter hours...'
                    value={hourInput}
                    onChange={(e) => setUserHour(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                </div>
  
                <Box
                  sx={{
                    alignItems: 'center',
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 1,
                    padding: 3,
                    border: '1px dashed grey',
                    width: 9/16,
                    height: 1/4,
                    backgroundColor: 'white'}}>
  
                      <Form.Group controlId='formFile' className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange={uploadFileHandler}/>
                      </Form.Group>
  
                </Box>
              
              <Button
                  style={{alignItems: "center", justifyContent: "center"}}
                  type='submit'
                  variant='outline-warning'
                  className='button rounded textColor'>
                  Confirm
              </Button>
              <Button
                  style={{alignItems: "center", justifyContent: "center"}}
                  variant='danger'
                  onClick={() => deleteHandler(product._id)}>
                  Delete
              </Button>
  
            </Box>
          </Stack>
  
        </Form>
  
      </div>
  
    </React.Fragment>
  )
}

export default CreateAuctionScreen