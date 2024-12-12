import { fetchAllProducts, fecthUserCart, updateUserCart } from "../firebase/shop.utils"

const getLocalCart = () => {
	const localCart = localStorage.getItem('local_cart')
	return localCart ? JSON.parse(localCart) : []
}

export const initialState = {
	cart: getLocalCart(),
	products: [],
}

export const SHOP_REDUCER_ACTIONS = {
	'INITIALIZE': 'INITIALIZE',
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

	case SHOP_REDUCER_ACTIONS.INITIALIZE:
		return setInitialCart(state, action)

	case SHOP_REDUCER_ACTIONS.ADD_TO_CART:
		return addToCart(state, action)

	case SHOP_REDUCER_ACTIONS.REMOVE_FROM_CART:
		return removeFromCart(state, action)

	case SHOP_REDUCER_ACTIONS.UPDATE_CART_DATA:
		return updateCartData(state, action)

	case SHOP_REDUCER_ACTIONS.CLEAR_CART:
		return clearCart(state, action)

	// case SHOP_REDUCER_ACTIONS.UPDATE_CART:
	// 	return action.payload
	// case SHOP_REDUCER_ACTIONS.FETCH_CART:
	// 	return action.payload
	// case SHOP_REDUCER_ACTIONS.FETCH_PRODUCTS:
	// 	return action.payload
	// case SHOP_REDUCER_ACTIONS.UPDATE_PRODUCTS:
	// 	return action.payload
	default:
		return console.error('Invalid action type')
	}
}

export const updateCartData = async(currentUser, cart) => {
	// localStorage.setItem('local_cart', JSON.stringify(cart))
	console.group('updateCartData')
	if (!currentUser) {
		return
	}
	console.log('currentUser => ', currentUser.displayName, cart)
	await updateUserCart(currentUser, cart)
}

const mergeCarts = (currentUserCart, localCart) => {
	const mergedCart = [...currentUserCart]

	if (localCart.length > 0) {
		localCart.forEach((item) => {
			const existingItem = mergedCart.find((cartItem) => cartItem.id === item.id)
			if (existingItem) {
				existingItem.quantity = item.quantity
			} else {
				mergedCart.push(item)
			}
		})
	}
	return mergedCart
}

const setInitialCart = (state, action) => {

	const currentUserCart = action.payload
		
	let local_cart = localStorage.getItem('local_cart')
	if (local_cart) {
		local_cart = JSON.parse(local_cart)
	} else {
		localStorage.setItem('local_cart', JSON.stringify([]))
		local_cart = []
	}

	const mergedCart = mergeCarts(currentUserCart, local_cart)
	

	console.log('mergedCart', mergedCart)
	return {
		...state,
		cart: mergedCart
	}
}

const addToCart = async(state, action) => {

	const product = action.payload

	const existingItem = state.cart.find((item) => item.id === product.id)
	if (existingItem) {
		const newState = {
			...state,
			cart: state.cart.map((item) => {
				if (item.id === product.id) {
					return {
						...item,
						quantity: item.quantity + 1
					}
				}
				return item
			})
		}
		await updateCartData(state.currentUser, newState.cart)
		return newState
	}
	const newState = {
		...state,
		cart: [...state.cart, { ...product, quantity: 1 }]
	}
	await updateCartData(state.currentUser, newState.cart)
	return newState
}

const removeFromCart = async(state, action) => {

	const product = action.payload

	const existingItem = state.cart.find((item) => item.id === product.id)
	if (existingItem.quantity === 1) {
		const newState = {
			...state,
			cart: state.cart.filter((item) => item.id !== product.id)
		}
		await updateCartData(state.currentUser, newState.cart)
		return newState
	}
	const newState = {
		...state,
		cart: state.cart.map((item) => {
			if (item.id === product.id) {
				return {
					...item,
					quantity: item.quantity - 1
				}
			}
			return item
		})
	}
	await updateCartData(state.currentUser, newState.cart)
	return newState
}

const clearCart = async(state, action) => {

	await updateCartData(state.currentUser, [])
	return {
		...state,
		cart: []
	}
}