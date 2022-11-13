import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../actions/productActions'
 
function PopupComp() {
 
  const { id } = useParams()
  const productId = id
 
  const dispatch = useDispatch()
 
  const productDetails = useSelector(state => state.productDetails)
  const { product } = productDetails
 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
 
  const [show, setShow] = useState(false);
  const [isBought, setBought] = useState(false);
  const [boughtBy, setBoughtBy] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const confirmHandler = (e) => {
    e.preventDefault()
    setBought(true)
    setShow(false)
    setBoughtBy(userInfo.id)

    dispatch(updateProduct({
      _id: productId,
      name: product.name,
      price: product.price,
      description: product.description, 
      itemLocation: product.location, 
      email:product.email,
      image: product.image,
      isBought,
      boughtBy,
    }))
  }
 
  return (
  <>
  <Button className= "margin-left margin-right buynow" variant="primary" onClick={handleShow}>
    Buy Now
  </Button>
 
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Purchase Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you would like to purchase this product?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={confirmHandler}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
</>
  )
}
 
export default PopupComp