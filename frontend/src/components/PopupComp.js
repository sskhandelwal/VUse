import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, listProductDetails } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

 
function PopupComp() {
 
  const { id } = useParams()
  const productId = id
 
  const dispatch = useDispatch()
 
  const productDetails = useSelector(state => state.productDetails)
  const { product } = productDetails
 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productUpdate = useSelector(state => state.productUpdate)
  const { success:successUpdate } = productUpdate
 
  const [show, setShow] = useState(false);
  const [isBought, setBought] = useState(false);
  const [boughtBy, setBoughtBy] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/myorders')
   } else {
      setBought(true)
      setBoughtBy(userInfo.id)
   }
  })
 
 
  const confirmHandler = (e) => {
    e.preventDefault()
    setShow(false)

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
    navigate('/orders')
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