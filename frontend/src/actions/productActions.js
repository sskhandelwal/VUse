import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'

//dispatch the products with the appropriate keyword
export const listProducts = (keyword = '') => async (dispatch) => {
    
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = keyword === null ? await axios.get('/api/products') : 
        await axios.get(`/api/products?keyword=${keyword}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `api/products/delete/${id}`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message,
        })
    }
}

// export const createListing = (user, name, price, description, itemLocation, email) => async (dispatch) => {
//     try{
//         dispatch({
//             type: PRODUCT_CREATE_REQUEST
//         })

//         const config = {
//             headers:{
//                 'Content-Type': 'application/json'
//             }
//         }
//         let info =  { 'username': user, 'name': name, 'price':price, 'description': description, 'itemLocation': itemLocation, 'email': email }
//         const { data } = await axios.post(
//             '/api/products/', info, config
//         )

//         dispatch({
//             type: PRODUCT_CREATE_SUCCESS,
//             payload: data
//         })

//     }catch(error){
//         dispatch({
//             type: PRODUCT_CREATE_FAIL,
//             payload: error.message,
//         })
//     }
// }

