import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { ArrowLeft } from 'react-bootstrap-icons';

function ProductScreen(history) {


  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch])

  let navigate = useNavigate()
  //navigate to the page where the url has the id of the item
  const addToCartHandler = () => {
    navigate(`/cart/${id}`)
  }

  return (
    <div>    
      <Link to='/' className='btn btn-light my-3'><ArrowLeft size={20} /> Go Back</Link>
      <div class = "d-flex flex-row bd-highlight mb-3">
      <img src={product.image} alt={product.name} rounded fluid/>
      <Col xs={1}></Col>
      <div class = "d-inline-flex-row p-2">
      <h1 body>{product.name}</h1>
      <br></br>
      <body className="body text-dark mb-5">
        Price: ${product.price} <br></br>
        <br></br>
        Description: {product.description} <br></br>
        <br></br>
        Location: {product.location} <br></br>
        <br></br>
        Email to Contact: <Link to='#' onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${product.email}`; }}>{product.email} </Link><br></br>
      </body>
      
      <Button
        onClick={addToCartHandler}
        type='submit'
        variant='outline-warning'
        className='button rounded textColor'
      >
        Add to cart
      </Button>
      
      <Button
        type='submit'
        variant='outline-warning'
        className='ms-2 rounded button textColor'
      >
        Add to watchlist
      </Button>
      </div>
      </div>
    </div>
  )
}

export default ProductScreen