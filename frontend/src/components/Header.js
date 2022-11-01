import React from 'react'
import SearchBox from './SearchBox'

function Header() {
  return (
    <div className='topnav'>
      <a className='bold' href='/'>VUse</a>
      <SearchBox />
      <a href='/createlisting'>Create Listing</a>
      <a href='/cart'>Cart</a>
      <a href='/login'>Login</a>
    </div>
  )
}

export default Header