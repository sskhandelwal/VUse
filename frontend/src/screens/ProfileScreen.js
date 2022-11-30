import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    let navigate = useNavigate()
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type:USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ 
                'id':user._id, 
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        }
        
    }

  return (
    <div className='app-orderscreen'>
        <Row className='header-product body'>
            <h2 className="text-center">User Profile</h2>
            <br></br>
            <br></br>
            {message && <Alert variant='danger'>{message}</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <span className='align-items-baseline'>
                    
                    
                </span>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
                        
                    
                    

                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <div className='text-center'>
                    <Button
                        type='submit'
                        variant='outline-warning'
                        className='button rounded textColor'
                    >
                        Update
                    </Button>
                </div>

            </Form>
        </Row>
    </div>
  )
}

export default ProfileScreen