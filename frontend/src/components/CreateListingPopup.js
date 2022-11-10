import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function CreateListingPopup() {

  const dispatch = useDispatch()  

  const [show, setShow] = useState(false)

  const productCreate = useSelector(state => state.productCreate)
  const { success: successCreate, product:createdProduct } = productCreate  

  let navigate = useNavigate()
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (successCreate) {
      navigate(`/product/${createdProduct._id}/edit`)
    }

  }, [dispatch, successCreate, createdProduct])
  
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
  <>
  {/* <Button variant="primary" onClick={handleShow}>
    Buy Now
  </Button> */}

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create a Listing</Modal.Title>
    </Modal.Header>
    <Modal.Body>Would you like to create a listing?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={createProductHandler}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
</>
  )
}

export default CreateListingPopup