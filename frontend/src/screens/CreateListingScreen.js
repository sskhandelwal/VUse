import React from 'react'
import { DropdownButton, Form, Row, Col } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'

function CreateListingScreen() {

  return (
    <div>
      <Row>
        <Col>
          {/* get listing type */}
          <DropdownButton title='Listing type'>
            <Dropdown.Item>
              Buy Now
            </Dropdown.Item>
            <Dropdown.Item>
              Auction
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <h1 className=''>
            Buy Now
          </h1>
        </Col>
        
      </Row>
      

      <br></br>

      {/* buy now listing form */}
      <Form.Group>
        <Form.Label>Item name</Form.Label>
        <Form.Control type='text' placeholder='Enter name...'/>
        <Form.Label>Item price</Form.Label>
        <Form.Control type='text' placeholder='Enter price...'/>
        <Form.Label>Item description</Form.Label>
        <Form.Control type='text' placeholder='Enter description...'/>
        <Form.Label>Item location</Form.Label>
        <Form.Control type='text' placeholder='Enter location...'/>
        <Form.Label>Contact email</Form.Label>
        <Form.Control type='email' placeholder='Enter email...'/>
        <Form.Label>Item picture 1</Form.Label>
        <Form.Control type='file' placeholder='Upload photo...'/>
        <Form.Label>Item picture 2</Form.Label>
        <Form.Control type='file' placeholder='Upload photo...'/>
        <Form.Label>Item picture 3</Form.Label>
        <Form.Control type='file' placeholder='Upload photo...'/>
      </Form.Group>

      <div className='buy-now-listing'>

      </div>
      <div className='auction-listing'>

      </div>
    </div>
  )
}

export default CreateListingScreen