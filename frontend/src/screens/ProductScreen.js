import React from 'react'
import { Button, Form } from 'react-bootstrap'

function ProductScreen() {
  return (
    <div>
      <h1>55 in. VIZIO HD Smart TV</h1>
      <img src="https://target.scene7.com/is/image/Target/GUEST_ef3bc6d4-8f11-4fe0-8488-e137340b4a1e" alt="Sample Product Image"></img>
      <body>
        Price: $245 <br></br>
        Condition: Used (Good Condition) <br></br>
        Location: Kissam (Warren) <br></br>
        Seller: Aaron Chen <br></br>
        Contact Info: (201) 555-7816 <br></br>
      </body>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2'
      >
        Add to cart
      </Button>
      <br></br>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2'
      >
        Add to watchlist
      </Button>
    </div>
  )
}

export default ProductScreen