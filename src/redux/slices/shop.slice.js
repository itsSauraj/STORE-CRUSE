import { createSlice } from '@reduxjs/toolkit';

import { fetchAllProducts, fecthUserCart, updateUserCart } from "../../firebase/shop.utils"

const initialState = {
	cart: [],
	products: [],
};

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setCart: (state, action) => {
			state.cart = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		addProductToCart: (state, action) => {
			state.cart = action.payload;
		},
		clearCart: (state) => {
			state.cart = [];
		},
	},
});

export default shopSlice.reducer;


export function setInitialProducts(){
	return async (dispatch, getState) => {
		const products = await fetchAllProducts();
		dispatch(shopSlice.actions.setProducts(products));
	}	
}

export function setInitialCart(currentUser){
	return async (dispatch, getState) => {
		const cart = await fecthUserCart(currentUser);
		dispatch(shopSlice.actions.setCart(cart));	
	}	
}

export function addProductToCart(product){
	return async (dispatch, getState) => {
		const existingProduct = getState().shop.cart.find((item) => item.id === product.id)
		if (existingProduct) {
			const newCart = getState().shop.cart.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})
			dispatch(shopSlice.actions.setCart(newCart))
		} else {
			const newCart = [...getState().shop.cart, { ...product, quantity: 1 }]
			dispatch(shopSlice.actions.setCart(newCart))
		}
		updateUserCart(getState().user.currentUser, getState().shop.cart)
	}
}


export function clearCart(){
	return async (dispatch, getState) => {
		dispatch(shopSlice.actions.clearCart())
		updateUserCart(getState().user.currentUser, [])
	}
}


export function increaseQuantity(product){
	return async (dispatch, getState) => {
		const newCart = getState().shop.cart.map((item) => {
			if (item.id === product.id) {
				return { ...item, quantity: item.quantity + 1 }
			}
			return item
		})
		dispatch(shopSlice.actions.setCart(newCart))
		updateUserCart(getState().user.currentUser, newCart)
	}
}

export function decreaseQuantity(product){
	return async (dispatch, getState) => {
		const newCart = getState().shop.cart
			.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity - 1 }
				}
				return item
			})
			.filter((item) => item.quantity > 0)
		dispatch(shopSlice.actions.setCart(newCart))
		updateUserCart(getState().user.currentUser, newCart)
	}
}


export function removeProductFromCart(product){
	return async (dispatch, getState) => {
		const newCart = getState().shop.cart.filter((item) => item.id !== product.id)
		dispatch(shopSlice.actions.setCart(newCart))
		updateUserCart(getState().user.currentUser, newCart)
	}
}