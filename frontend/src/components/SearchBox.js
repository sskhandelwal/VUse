import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler}>
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        onChange={(e) => setKeyword(e.target.value)}
                    ></Form.Control>
                </Col>
                <Col>
                    <Button type='submit'>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchBox