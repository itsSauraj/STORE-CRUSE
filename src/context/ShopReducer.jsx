import { fetchAllProducts, fecthUserCart, updateUserCart } from "../firebase/shop.utils"

export const initialState = {
	cart: [],
	products: [],
}

export const SHOP_REDUCER_ACTIONS = {
	'SET_INITIAL_CART': 'INITIALIZE',
	'ADD_TO_CART': 'ADD_TO_CART',
	'REMOVE_FROM_CART': 'REMOVE_FROM_CART',
	'UPDATE_CART': 'UPDATE_CART',
	'FETCH_CART': 'FETCH_CART',
	'FETCH_PRODUCTS': 'FETCH_PRODUCTS',
	'UPDATE_PRODUCTS': 'UPDATE_PRODUCTS',
	'UPDATE_CART_DATA': 'UPDATE_CART_DATA',
	'CLEAR_CART': 'CLEAR_CART',
}

export const shopReducer = ( state, action ) => {
	switch (action.type) {

	case SHOP_REDUCER_ACTIONS.SET_INITIAL_CART:
		return setInitialData(state, action)
	default:
		return console.error('Invalid action type')
	}
}

export const updateCartData = async(currentUser, cart) => {
	if (!currentUser) {
		return
	}
	console.log('currentUser => ', currentUser.displayName, cart)
	await updateUserCart(currentUser, cart)
}

const setInitialData = (state, action) => {
	return {
		...action.payload
	}
}