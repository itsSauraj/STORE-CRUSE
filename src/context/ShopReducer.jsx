export const initialState = {
	cart: [],
	products: [],
	cartEmpty: false
}

export const SHOP_REDUCER_ACTIONS = {
	'SET_INITIAL_PRODUCTS': 'SET_INITIAL_PRODUCTS',
	'SET_INITIAL_CART': 'INITIALIZE_CART',
	'ADD_TO_CART': 'ADD_TO_CART',
	'REMOVE_FROM_CART': 'REMOVE_FROM_CART',
	'INCREASE_QUANTITY': 'INCREASE_QUANTITY',
	'DECREASE_QUANTITY': 'DECREASE_QUANTITY',
	'CLEAR_CART': 'CLEAR_CART',
}

export const shopReducer = ( state, action ) => {
	switch (action.type) {

	case SHOP_REDUCER_ACTIONS.SET_INITIAL_PRODUCTS:
		return INITIALIZE_PRODUCTS(state, action)
	case SHOP_REDUCER_ACTIONS.SET_INITIAL_CART:
		return INITIALIZE_CART(state, action)
	case SHOP_REDUCER_ACTIONS.ADD_TO_CART:
		return ADD_TO_CART(state, action)
	case SHOP_REDUCER_ACTIONS.INCREASE_QUANTITY:
		return INCREASE_QUANTITY(state, action)
	case SHOP_REDUCER_ACTIONS.DECREASE_QUANTITY:
		return DECREASE_QUANTITY(state, action)
	case SHOP_REDUCER_ACTIONS.REMOVE_FROM_CART:
		return REMOVE_FROM_CART(state, action)
	case SHOP_REDUCER_ACTIONS.CLEAR_CART:
		return CLEAR_CART(state, action)
	default:
		return console.error('Invalid action type')
	}
}

const INITIALIZE_PRODUCTS = (state, action) => {
	
	console.log("Action ", action.payload)

	return {
		...state,
		products: action.payload
	}
}

const INITIALIZE_CART = (state, action) => {
	return {
		...state,
		cart: action.payload,
	}
}


const ADD_TO_CART = (state, action) => {
	const product = action.payload
	const existingProduct = state.cart.find((item) => item.id === product.id)
	if (existingProduct) {
		return {
			...state,
			cart: state.cart.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})
		}
	}
	return {
		...state,
		cart: [...state.cart, { ...product, quantity: 1 }]
	}
}

const INCREASE_QUANTITY = (state, action) => {
	return {
		...state,
		cart: state.cart.map((item) => {
			if (item.id === action.payload.id) {
				return { ...item, quantity: item.quantity + 1 }
			}
			return item
		})
	}
}

const DECREASE_QUANTITY = (state, action) => {
	return {
		...state,
		cart: state.cart
			.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, quantity: item.quantity - 1 }
				}
				return item
			})
			.filter((item) => item.quantity > 0)
	}
}

const REMOVE_FROM_CART = (state, action) => {
	return {
		...state,
		cart: state.cart.filter((item) => item.id !== action.payload.id)
	}
}

const CLEAR_CART = (state, action) => {
	return {
		...state,
		cart: [],
		cartEmpty: true
	}
}