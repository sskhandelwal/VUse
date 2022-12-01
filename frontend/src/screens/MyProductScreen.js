import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'

function ProductListScreen({ }) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { success:successDelete } = productDelete

    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    let navigate = useNavigate()
    useEffect(() => {
        if (userInfo) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }

    }, [dispatch, userInfo, successDelete])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <Container>
            
            <h1>My Products</h1>

            {loading
                ? (<Loader />)
                : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>LOCATION</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        product.user === userInfo.id ? 
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            {
                                                product.bid === null ?
                                                (
                                                    <td>${product.price}</td>
                                                ) :
                                                (
                                                    <td>${product.bid}</td>
                                                )
                                            }
                                            
                                            <td>{product.location}</td>

                                            <td>
                                                {
                                                    product.bid === null ?
                                                    (
                                                        <LinkContainer to={`/product/${product._id}/edit`}>
                                                            <Button variant='light' className='btn-sm'>
                                                                <i className='fas fa-edit'></i>
                                                            </Button>
                                                        </LinkContainer>
                                                    ) :
                                                    (
                                                        <LinkContainer to={`/auctionproduct/${product._id}/edit`}>
                                                            <Button variant='light' className='btn-sm'>
                                                                <i className='fas fa-edit'></i>
                                                            </Button>
                                                        </LinkContainer>
                                                    )
                                                }
                                                

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                        : ''
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
        </Container>
    )
}

export default ProductListScreen