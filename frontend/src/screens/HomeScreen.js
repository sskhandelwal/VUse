import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products } = productList

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])


  return (
    <div>
        <h1>Latest Products</h1>
        {loading ? <Loader/>
          :
          <Row>
            {products.map(product => (
                <Col key={product.id}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        }
    </div>
  )
}

export default HomeScreen