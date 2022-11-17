import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useSearchParams, Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard"
import { Grid } from "@mui/material"
import { Row, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ProductSliderCard } from '../components/ProductSliderCard'
import { Typography, Slider } from '@mui/material';

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products } = productList

  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.get("keyword")
  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  // JS code for product slider
  const [index, setIndex] = useState(0);

  const mod = (n, m) => {
    let result = n % m;

    // Return a positive value
    return result >= 0 ? result : result + m;
  };

  const cards = [
    {
      id: "1",
      item: products[0]
    },
    {
      id: "2",
      item: products[1]
    },
    {
      id: "3",
      item: products[2]
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % cards.length);
      console.log(index);
    }, 3500);
  }, [index, cards.length]);

  // JS code for filters and sorting
  // TODO: WRITE THIS CODE!!!

  return (
    <React.Fragment>
      { keyword === null ? (
        <div>
          {/* Output "Featured Products" */}
          <h1
            style={{
              background: '#CFAE70',
              paddingLeft: '5%',
              marginBottom: '0'
            }}
          >
          Featured Products
          </h1>

          {/* Product Slider */}
          <div className='product-slider'>
            {cards.map((obj, i) => {
              const indexLeft = mod(index - 1, cards.length);
              const indexRight = mod(index + 1, cards.length);

              let className = "product-slider-card";

              if (i === index) {
                className = "product-slider-card card-active";
              } else if (i === indexRight) {
                className = "product-slider-card card-right";
              } else if (i === indexLeft) {
                className = "product-slider-card card-left";
              } else className = "product-slider-card";

              return (
                <Link
                  to={`/product/${obj.item?._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={className}>
                    <ProductSliderCard product={obj.item}/>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        // else return nothing
        <div></div>
      )}
      
      <Row>
        <Col>
          {/* Output "Latest Products" */}
          <h1
            style={{
              paddingLeft: '10%',
              paddingTop: '30px',
              paddingBottom: '30px'
            }}
          >
            Latest Products
          </h1>
        </Col>
        
        {/* Filters */}
        {/* <Col>
          <Slider
            value={value}
            onChange={rangeSelector}
            valueLabelDisplay="auto"
          />
        </Col> */}
        
        {/* Sorting */}
        <Col>
          <DropdownButton
            id="dropdown-basic-button"
            title="Sort by"
            style={{
              paddingRight: '5%',
              paddingTop: '20px',
              paddingBottom: '30px',
              float: 'right'
            }}
          >
            <Dropdown.Item href="#/action-1">Featured</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Price (low to high)</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Price (high to low)</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      
      {/* Display Grid of Latest Products */}
      <Grid container>
        {products.filter(boughtProduct => !boughtProduct.isBought).map(product => (
          <Grid item xs={12} md={6} xl={4}>
            <ProductCard product={ product }/>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
    
  )
}

export default HomeScreen