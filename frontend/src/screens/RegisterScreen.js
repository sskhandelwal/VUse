import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
 
function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
 
    const dispatch = useDispatch()
 
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
 
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
 
    let navigate = useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])
 
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
       
    }
 
    const handleEmail = (e) => {
        const value = e.target.value
        if (/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!vanderbilt)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/.test(value)){
            setMessage('Must have a valid Vanderbilt Email')    
        }
        else{
            setEmail(value)
        }
    }
  return (
    <React.Fragment>
        {/* Add gap between header and login box */}
        <div style={{background: '#CFAE70', height: '5vh'}}></div>
        <div className='product-slider'>
            <div className='app-registerscreen'>
        
            <div className = "details">
            <h1 style={{ fontWeight: 'bold' }}>Sign Up</h1>
            {message && <Alert variant='danger'>{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className = 'length-boxes'>
            <Form.Group controlId='name'>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='email'>
    
                    <Form.Control
                        required
                        type='email'
                        placeholder='Email Address'
                        onChange={(e) => {
                            handleEmail(e)
                        }}
                        value={email}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='password'>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Re-Enter Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                        <br></br>
            
                
                    <Button type='submit'>
                        Register
                    </Button>
    
            </Form>
    
            <Row className='py-3'>
                <Col>
                    Have an account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
            </div>
            </div>
        </div>
        <div style={{background: '#FFF', height: '10vh'}}></div>
    </React.Fragment>
  )
}
 
export default RegisterScreen