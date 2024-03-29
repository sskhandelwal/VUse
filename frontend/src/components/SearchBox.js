import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        //if the keyword exists, go to a page where the url has they keyword
        //at the end
        if (keyword) {
            navigate(`/home/?keyword=${keyword}`)
        } else {
            navigate('/home')
        }
    }
    return (
        <Form onSubmit={submitHandler}>
            <Row>
                <Col>
                    <Form.Control
                        type='text'
                        //set the keyword to whatever the user inputs here
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{width: '200px'}}
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