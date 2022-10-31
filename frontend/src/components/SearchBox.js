import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
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
        <div class='search-container'>
            <form onSubmit={submitHandler}>
                <input
                    type='text'
                    placeholder='Search...'
                    onChange={(e) => setKeyword(e.target.value)}
                ></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SearchBox