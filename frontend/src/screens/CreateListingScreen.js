import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct, deleteProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import {withRouter} from 'react-router'
import {Box, Stack, Divider} from '@mui/material'

function CreateListingScreen() {
  const { id } = useParams()
  const productId = id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [itemLocation, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [itemImage, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [bidding, setBidding] = useState(false)

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
      isBought: false,
      boughtBy: product.boughtBy,
      isAuction: false
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
          Item Details (Buy Now)
        </h1>
      
        <Form onSubmit={submitHandler}>
        
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
                  <Form.Label>Item price</Form.Label>
                  <Form.Control
                    type = 'number'
                    placeholder='Enter price...'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>
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
                  <Form.Label>Item location</Form.Label>
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
                  <Form.Label>Contact email</Form.Label>
                  <Form.Control
                    type = 'email'
                    placeholder='Enter email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
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
                  type='submit'>
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

export default CreateListingScreen