import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard"
import { Grid, Box } from "@mui/material"

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products } = productList

  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.get("keyword")
  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  return (
    <Grid container>
      {products.map(product => (
        <Grid item xs={12} md={6} xl={4}>
          <ProductCard product={ product }/>
        </Grid>
      ))}
    </Grid>
  )
}

export default HomeScreen