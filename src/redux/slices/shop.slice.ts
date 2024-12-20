import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { fetchAllProducts, fecthUserCart, updateUserCart } from "../../utils/firebase/shop.utils"

import { ProductInterface, CartInterface, ShopState } from '../../types/shop.interface';

const initialState: ShopState = {
	cart: [],
	products: [],
	isProductLoading: false,
	errorLoadingProducts: false,
	isCartLoading: false,
	errorLoadingCart: false,
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
		setIsCartLoading: (state, action) => {
			state.isCartLoading = action.payload;
		},
		setIsProductLoading: (state, action) => {
			state.isProductLoading = action.payload;
		},
		setErrorLoadingProducts: (state, action) => {
			state.errorLoadingProducts = action.payload;
		},
		setErrorLoadingCart: (state, action) => {
			state.errorLoadingCart = action.payload;
		}
	},
});

export default shopSlice.reducer;


export function setInitialProductsAsync(){
	return async (dispatch: any, getState: any) => {

		dispatch(shopSlice.actions.setIsProductLoading(true));
		try {
			const products = await fetchAllProducts();
			dispatch(shopSlice.actions.setProducts(products));
			dispatch(shopSlice.actions.setIsProductLoading(false));
		} catch (error) {
			dispatch(shopSlice.actions.setErrorLoadingProducts(true));
			dispatch(shopSlice.actions.setIsProductLoading(false));
		}
	}
}

export function setInitialCart(currentUser: any){
	
	return async (dispatch: any, getState: any) => {
		
		dispatch(shopSlice.actions.setIsCartLoading(true));

		try{
			const cart = await fecthUserCart(currentUser);
			dispatch(shopSlice.actions.setCart(cart));
			dispatch(shopSlice.actions.setIsCartLoading(false));
		} catch (error) {
			console.error("Error fetching user cart: ", error);
			dispatch(shopSlice.actions.setErrorLoadingCart(true));
			dispatch(shopSlice.actions.setIsCartLoading(false));
		}
	}	
}


export async function fetchProducts(){
	
	return async (dispatch: any, getState: any) => {
		dispatch(shopSlice.actions.setIsProductLoading(true));
		const products = await fetchAllProducts();
		dispatch(shopSlice.actions.setProducts(products));
		dispatch(shopSlice.actions.setIsProductLoading(false));
	}
}

export function addProductToCart(product: ProductInterface){
	return async (dispatch: any, getState: any) => {
		const existingProduct = getState().shop.cart.find((item: ProductInterface) => item.id === product.id)
		if (existingProduct) {
			const newCart = getState().shop.cart.map((item: CartInterface) => {
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
	return async (dispatch: any, getState: any) => {
		dispatch(shopSlice.actions.clearCart())
		updateUserCart(getState().user.currentUser, [])
	}
}


export function increaseQuantity(product: CartInterface){
	return async (dispatch: any, getState: any) => {
		const newCart = getState().shop.cart.map((item: CartInterface) => {
			if (item.id === product.id) {
				return { ...item, quantity: item.quantity + 1 }
			}
			return item
		})
		dispatch(shopSlice.actions.setCart(newCart))
		updateUserCart(getState().user.currentUser, newCart)
	}
}

export function decreaseQuantity(product: CartInterface){
	return async (dispatch: any, getState: any) => {
		const newCart : CartInterface[] = getState().shop.cart
			.map((item : CartInterface) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity - 1 }
				}
				return item
			})
			.filter((item: CartInterface) => item.quantity > 0)
		dispatch(shopSlice.actions.setCart(newCart))
		updateUserCart(getState().user.currentUser, newCart)
	}
}


export function removeProductFromCart(product: CartInterface){
	return async (dispatch: any, getState: any) => {
		const newCart : CartInterface[] = getState().shop.cart.filter((item: CartInterface) => item.id !== product.id)
		dispatch(shopSlice.actions.setCart(newCart))
		updateUserCart(getState().user.currentUser, newCart)
	}
}