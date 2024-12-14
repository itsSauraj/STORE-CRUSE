import { createContext, useState, useEffect, useContext, useReducer } from "react"
import { fetchAllProducts, fecthUserCart, updateUserCart } from "../firebase/shop.utils"

import { UserContext } from "./UserContext"
import {
	initialState,
	shopReducer,
	SHOP_REDUCER_ACTIONS,
} from "./ShopReducer"

import PropTypes from 'prop-types'

const ShopContext = createContext({
	cart: [],
	products: [],
	setProducts: () => {},
})

const ShopProvider = ({ children }) => {

	const { currentUser } = useContext(UserContext)
	const [state, dispatch] = useReducer(shopReducer, initialState)
	
	const [products, setProducts] = useState(() => {[]})

	useEffect(() => {

		const UpdateRemoteCart = async () => {
			await updateUserCart(currentUser, state.cart)
		}

		if (currentUser && state.cartEmpty) {
			localStorage.removeItem(`cart-${currentUser.uid}`)
			UpdateRemoteCart()
		}

		if (currentUser && state.cart.length > 0) {
			localStorage.setItem(`cart-${currentUser.uid}`, JSON.stringify(state.cart))
			UpdateRemoteCart()
		}
	}, [state])

	useEffect(() => {

		const fetchProducts = async () => {
			const fetchedProducts = await fetchAllProducts()
			localStorage.setItem('products', JSON.stringify(fetchedProducts))
			setProducts(fetchedProducts)
		}
		fetchProducts()

		const fetchCurrentUserCartData = async () => {
			const fetchedCart = await fecthUserCart(currentUser)
			Promise.allSettled(fetchedCart).then((results) => {
				let cartList = []
				results.forEach((result, index) => {
					if (result.status === 'fulfilled') {
						cartList = [...cartList, result.value]
					}
				})
				dispatch({ 
					type: SHOP_REDUCER_ACTIONS.SET_INITIAL_CART, 
					payload: cartList
				})
			})
		}
		if (currentUser){
			fetchCurrentUserCartData();
		}
	}, [])

	return (
		<ShopContext.Provider value={{ products, state, dispatch, SHOP_REDUCER_ACTIONS }}>
			{children}
		</ShopContext.Provider>
	)
}

export { ShopContext, ShopProvider }

ShopProvider.propTypes = {
	children: PropTypes.node.isRequired
}