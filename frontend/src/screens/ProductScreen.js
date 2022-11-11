import React, { useEffect, useState } from 'react'
import { Button, Col, Figure, Tooltip } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { ArrowLeft, Heart, Circle, ShareFill, Cart, Chat, MapFill} from 'react-bootstrap-icons';
import PopupComp from '../components/PopupComp'
import '../index.css'
 
 
function ProductScreen(history) {
  const [isLiked, setIsLiked] = useState(false);
 
  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const [setBgColour] = useState("#fafafa");
  useEffect(() => {
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
 
 
  const currentURL = window.location.href;
  return (
   
    <div>
      <div className='header-product'>
       
        <Link to='/home' className= 'back-button'> <ArrowLeft size={40} /> </Link>
        {/*Need to change this a logo of the person's */}
        <Circle size={50} color= '#1C1C1C'></Circle>
        {/* Need to change to person's name */}
        <span className='product-header'> {product.email} </span>
         
        <span className='product-copy'><Link to = '/'currentURL ><ShareFill size = {33}></ShareFill></Link></span>
       
      </div>
     
      <div className='app'>
        <div class = "d-flex flex-mb-3">
          <div className = "details">
            <div className="big-img">
                   
              <Figure>
                <img src={product.image} alt={product.name} />
              </Figure>
            </div>
            <Heart color={isLiked ? 'red' : ''} onClick={handleHeartClick} size= {40} className='heart-details'></Heart>
          </div>
          <Col xs={1}></Col>
          <div class = "d-inline-flex-row p-2 w-100">    
         
            <div className="box">
              <div>
                <div className="item-header">
                  <h1 className='body'>{product.name} </h1>
                  <span style={{ fontSize: 25}}>${product.price}</span>
                </div>
                <p>{product.description}</p>
              </div>
              <div className ="button-features">
                <Button onClick={addToCartHandler} className="cart"><Cart size={20}></Cart> Add to cart</Button>
             
                <PopupComp ></PopupComp>
                <Button onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${product.email}`; }} className ="margin-left message"> <Chat size={18}></Chat> Contact </Button>
                <MapFill className='margin-left' size={40} color='black' data-toggle="tooltip" title= {product.location}>{product.location}</MapFill>
               
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  )
}
 
export default ProductScreen