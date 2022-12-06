import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Figure, Form, Tooltip } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { ArrowLeft, Heart, Circle, ShareFill, Cart, Chat, Basket} from 'react-bootstrap-icons';
import PopupComp from '../components/PopupComp'
import '../index.css'
import { Card, CardContent, Typography, CardMedia } from '@mui/material'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Modal from 'react-bootstrap/Modal';
import {Box, Stack, Divider} from '@mui/material'


 
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
      date: product.hours,
      isAuction: product.isAuction
    }))
  }
 
  const tenPercHandler = () => {
    setInitialBidPrice(product.bid * 1.1)
  }
  const twentyPercHandler = () => {
    setInitialBidPrice(product.bid * 1.2)
  }
  const thirtyPercHandler = () => {
    setInitialBidPrice(product.bid * 1.3)
  }
   
  return (
    <React.Fragment>
      <Stack   
        direction="row" justifyContent="center" alignItems="center" spacing={2} 
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: 1,
            marginTop: 20,
            padding: 2,
            border: 1,
            width: 1/2,
            height: 1/4,
            backgroundColor: '#fff',
            alignItems: 'center'}
          }
        >
            
          <CardMedia
            component='img'
            sx={{height: '350px', width: 'auto'}}
            image={ product.image }
            alt='Product Image'
            style={{float: 'right', padding: '2%'}}
          />
         
          <CardContent sx={{ flex: '1 0 auto' }}>
            {!product.isAuction ? (
              <div></div>
              ) : (
                <Typography variant="h6" sx={{color: "red"}} display='inline'>
                  (Auction){' '}
                </Typography>)
            }
            <Typography variant="h6" display='inline'>
              { product.name } 
            </Typography>
            <Typography variant="body1">
              Location: { product.location }
            </Typography>
            <br></br>
            <Typography variant='body2'>
              { product.description }
            </Typography>
            <br></br>
              
            {!product.isAuction ? (
              <Typography variant="h4" color="text.secondary">
                Price: ${product.price}
              </Typography> ) : (
              <div>
                <Typography variant="h4" color="text.secondary">
                  Current Bid: ${product.bid}
                </Typography>
                <Typography variant="h8" sx={{color: "red"}}>
                  Ends At: {product.endDate.slice(0, 10)} {' '} @ {' '} {product.endDate.slice(11, 16)} [UTC; 24-hour clock]
                </Typography>
              </div>)
            }
          </CardContent>
          
          {!product.isAuction ? (
            <div>
              <Button
                style={{marginLeft: '5%', alignItems: "center", justifyContent: "center"}}
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>

              <Button
                style={{marginLeft: '5%', alignItems: "center", justifyContent: "center"}} 
                onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${product.email}`; }}
              >
                Contact
              </Button>

            </div> ) : (
            <Form onSubmit={handleShow}>
              <Button
                style={{marginLeft: '5%', alignItems: "center", justifyContent: "center"}}
                type='submit'
                onClick={tenPercHandler}
              >
                10% Increase
              </Button>
              <Button
                style={{marginLeft: '5%', alignItems: "center", justifyContent: "center"}}
                type='submit'
                onClick={twentyPercHandler}
              >
                20% Increase
              </Button>
              <Button
                style={{marginLeft: '5%', alignItems: "center", justifyContent: "center"}}
                type='submit'
                onClick={thirtyPercHandler}
              >
                30% Increase
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
            </Form>)
          }
        </Box>
      </Stack>
    </React.Fragment>

    // Approach #2:

    // <div className='body'>
     
    //   <div className='app'>
    //     <div class = "d-flex flex-mb-3">
    //       <Col xs={1}></Col>
    //       <div class = "d-inline-flex-row p-2 w-200">    
         
    //         <div className="box">
    //           <div>
    //             <div className="item-header">
    //               <h1 className='body'>{product.name} </h1>
    //               {
    //                 !product.isAuction ?
    //                 (<span style={{ fontSize: 25}} className='body text-bold'>${product.price}</span>) :
    //                 (<span style={{ fontSize: 25 }} className='body text-bold'>Current Bid: ${product.bid}</span>)
    //               }
                  
    //             </div>
    //             <p>{product.description}</p>
    //             {!product.isAuction
    //             ? (<h3>Item is not up for bidding</h3>) :
    //             (
    //               <Form onSubmit={handleShow}>
    //                 {/* <Form.Group controlId='bid'>
    //                   <Form.Label>Enter your bid</Form.Label>
    //                   <Form.Control
    //                     required
    //                     type = 'number'
    //                     placeholder='Enter bid...'
    //                     value={initialBidPrice}
    //                     onChange={(e) => setInitialBidPrice(e.target.value)}
    //                   >
    //                   </Form.Control>
    //                 </Form.Group> */}
    //                 <Button
    //                   clasName='btn-sm'
    //                   type='submit'
    //                   onClick={tenPercHandler}
    //                 >
    //                   10% Increase
    //                 </Button>
    //                 <Button
    //                   clasName='btn-sm'
    //                   type='submit'
    //                   onClick={twentyPercHandler}
    //                 >
    //                   20% Increase
    //                 </Button>
    //                 <Button
    //                   clasName='btn-sm'
    //                   type='submit'
    //                   onClick={thirtyPercHandler}
    //                 >
    //                   30% Increase
    //                 </Button>
    //               <Modal show={show} onHide={handleClose}>
    //                 <Modal.Header closeButton>
    //                   <Modal.Title>Modal heading</Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>Are you sure you would like to bid?</Modal.Body>
    //                 <Modal.Footer>
    //                   <Button variant="secondary" onClick={handleClose}>
    //                     No
    //                   </Button>
    //                   <Button variant="primary" onClick={submitHandler}>
    //                     Yes
    //                   </Button>
    //                 </Modal.Footer>
    //               </Modal>
    //               </Form>
    //             )
    //             }
               
    //           </div>
    //           <div className ="button-features">
    //             <Button onClick={addToCartHandler} className="cart"><Cart size={20}></Cart> Add to cart</Button>
    //             {
    //               !product.isAuction ?
    //               (
    //                 <PopupComp ></PopupComp>
    //               ) : (
    //                 <h3>
    //                   Bidding Ends at {product.endDate}
    //                 </h3>
    //               )
    //             }
  
    //             <Button onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${product.email}`; }} className ="margin-left message"> <Chat size={18}></Chat> Contact </Button>
    //             <span className='margin-left-location text-bold'>{product.location}</span>
               
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
   
    // </div>
  )
}
 
export default ProductScreen