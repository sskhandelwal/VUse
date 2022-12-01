import React, { useEffect, useState } from 'react'
import { Button, Col, Figure, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { ArrowLeft, Heart, Circle, ShareFill, Cart, Chat, Basket} from 'react-bootstrap-icons';
import PopupComp from '../components/PopupComp'
import '../index.css'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Modal from 'react-bootstrap/Modal';


 
 
function ProductScreen() {

  const [isLiked, setIsLiked] = useState(false)
  const [initialBidPrice, setInitialBidPrice] = useState(0)
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
 
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
    const interval = setInterval(() => {
      const now = new Date().getTime()

      const diff = product.milliseconds - now

      setDay(day => Math.floor(product.milliseconds / (1000 * 60 * 60 * 24) - (now / (1000 * 60 * 60 * 24))))
      setHour(hour => Math.floor((product.milliseconds / (1000 * 60 * 60) - (now / (1000 * 60 * 60))) % 24))
      setMin(min => Math.floor((product.milliseconds / (1000 * 60) - (now / (1000 * 60 ))) % 60))
      setSec(sec => Math.floor((product.milliseconds / (1000) - (now / (1000))) % 60))
    }, 1000);

    return () => clearInterval(interval);

  }, [dispatch, day, hour, min, sec])
 
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

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitHandler = (e) => {
    e.preventDefault()
    handleClose()
    dispatch(updateProduct({
      _id: productId,
      name: product.name, 
      initialBidPrice,
      description: product.description, 
      itemLocation: product.location, 
      email: product.email,
      itemImage: product.image,
      isBought: false,
      boughtBy: product.boughtBy, 
      date: product.when
    }))
    navigate(`/product/${productId}`)
  }
 
   
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
                  <Form onSubmit={handleShow}>
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
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you would like to bid?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button variant="primary" onClick={submitHandler}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
                    <h3>
                      {day} days, {hour} hours, {min} minutes, {sec} seconds
                    </h3>
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