import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
 
 
function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const dispatch = useDispatch()
 
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/home'
 
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    let navigate = useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])
 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
 
  return (
    <React.Fragment>
        {/* Add gap between header and login box */}
        <div style={{background: '#CFAE70', height: '10vh'}}></div>

        {/* login box */}
        <div className='product-slider'>
            <div className='app-registerscreen'>
                <div className='detail'>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Login</h1>
                {error && <Alert variant='danger'>Username and/or Password is incorrect </Alert>}
                {loading && <Loader />}
                    <Form onSubmit={submitHandler} className = 'length-boxes-login'>
                        <Form.Group controlId='email'>
                            <Form.Control
                                type='email'
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId='password'>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <br></br>
                        <Button type='submit'>
                            Sign In
                        </Button>
                    </Form>
                <br></br>
        
                <div style={{textAlign: 'center'}}>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </div>
                <br></br>
        
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}
 
export default LoginScreen