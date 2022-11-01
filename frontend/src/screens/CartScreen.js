import React, {useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Alert, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ history }) {
  const { id } = useParams()
  const productId = id

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    //if the id exists, add it to the cart
    if(productId) {
      dispatch(addToCart(productId))
    }
  }, [dispatch, productId])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  let navigate = useNavigate()
  const checkoutHandler = () => {
    navigate('/login')
  }

  return (
    <Row>
      <Col md={8}>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert variant='info'>
            Your cart is empty: <Link to='/'>Go Back</Link>
          </Alert>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>

                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Subtotal:</h3>
              {/* ${scores.reduce((previousScore, currentScore, index)=>previousScore+currentScore, 
                100)} */}
              ${cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
                Buy Items Now
              </Button>
          </ListGroup.Item>

        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen