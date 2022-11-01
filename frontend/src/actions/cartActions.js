import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// This function adds an item with a specific id to the cart
export const addToCart = (id) => async (dispatch, getState) => {
    //get the product infomation from the backend and assign it to data
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,

        // dispatch the data with the below payload
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
        }
    })

    //put the data in local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload: id, 
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}