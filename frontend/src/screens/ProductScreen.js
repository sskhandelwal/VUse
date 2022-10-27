import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

function ProductScreen(history) {


  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch])

  let navigate = useNavigate()
  const addToCartHandler = () => {
    navigate(`/cart/${id}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} fluid />
      <body>
        Price: {product.price} <br></br>
        Description: {product.description} <br></br>
        Location: {product.location} <br></br>
        Email to Contact: {product.email} <br></br>
      </body>
      <Button
        onClick={addToCartHandler}
        type='submit'
        variant='outline-success'
        className='p-2'
      >
        Add to cart
      </Button>
      <br></br>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2'
      >
        Add to watchlist
      </Button>
    </div>
  )
}

export default ProductScreen