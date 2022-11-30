import React, { useEffect, useState } from 'react'
import { Button, Col, Figure, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { ArrowLeft, Heart, Circle, ShareFill, Cart, Chat, Basket} from 'react-bootstrap-icons';
import PopupComp from '../components/PopupComp'
import '../index.css'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Countdown from 'react-countdown'

 
 
function ProductScreen() {

  const [isLiked, setIsLiked] = useState(false)
  const [initialBidPrice, setInitialBidPrice] = useState(0)
 
  const { id } = useParams()
  const productId = id
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { product } = productDetails
  const productUpdate = useSelector(state => state.productUpdate)
  const { success:successUpdate } = productUpdate
  
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate(`/product/${productId}`)
    }
    dispatch(listProductDetails(id))
  }, [dispatch])
 
  let navigate = useNavigate()
  //navigate to the page where the url has the id of the item
  const addToCartHandler = () => {
    navigate(`/cart/${id}`)
  }
 
  //function for the heart when clicked on it changes color
  const handleHeartClick = () => {
    console.log('clicked heart');
    setIsLiked(prev => !prev);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const form = e.currentTarget()
    if (form.checkValidity() === false) {
      e.stopPropogation()
    }
    dispatch(updateProduct({
      _id: productId,
      name: product.name, 
      initialBidPrice,
      description: product.description, 
      itemLocation: product.location, 
      email: product.email,
      itemImage: product.image,
      isBought: false,
      boughtBy: product.boughtBy 
    }))
    navigate(`/product/${productId}`)
  }
  const [validated, setValidated] = useState(false)
  const handleBid = (e) => {
    e.preventDefault()
    if (initialBidPrice > product.bid) {
      setInitialBidPrice(e.target.value)
      setValidated(true)
    } else {
      setValidated(false)
    }
  }
 
 
  const Completionist = () => <span>You are good to go!</span>
  return (
   
    <div className='body'>
      <div className='header-product'>
       
        <Link to='/home' className= 'back-button'> <ArrowLeft size={40} /> </Link>
       
       
      </div>
     
      <div className='app'>
        <div class = "d-flex flex-mb-3">
          <div className = "details">
            <div className="big-img">
                   
              <Figure>
                <img src={product.image} alt={product.name} />
              </Figure>
            </div>
            <Heart color={isLiked ? 'red' : ''} onClick={handleHeartClick} size= {40} className='heart-details' data-toggle="tooltip" title="Add to Watchlist"></Heart>
          </div>
          <Col xs={1}></Col>
          <div class = "d-inline-flex-row p-2 w-200">    
         
            <div className="box">
              <div>
                <div className="item-header">
                  <h1 className='body'>{product.name} </h1>
                  {
                    product.bid === null ?
                    (<span style={{ fontSize: 25}} className='body text-bold'>${product.price}</span>) :
                    (<span style={{ fontSize: 25 }} className='body text-bold'>Current Bid: ${product.bid}</span>)
                  }
                  
                </div>
                <p>{product.description}</p>
                {product.bid === null
                ? (<h3>Item is not up for bidding</h3>) :
                (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='bid'>
                      <Form.Label>Enter your bid</Form.Label>
                      <Form.Control
                        required
                        type = 'number'
                        placeholder='Enter bid...'
                        value={initialBidPrice}
                        onChange={(e) => setInitialBidPrice(e.target.value)}
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
                )
                }
               
              </div>
              <div className ="button-features">
                <Button onClick={addToCartHandler} className="cart"><Cart size={20}></Cart> Add to cart</Button>
                {
                  product.bid === null ?
                  (
                    <PopupComp ></PopupComp>
                  ) : (
                    <Countdown date={Date.now() + 5000}>
                        <Completionist />
                    </Countdown>
                  )
                }
  
                <Button onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${product.email}`; }} className ="margin-left message"> <Chat size={18}></Chat> Contact </Button>
                <span className='margin-left-location text-bold'>{product.location}</span>
               
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  )
}
 
export default ProductScreen