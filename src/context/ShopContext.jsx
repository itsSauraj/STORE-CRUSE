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
	setCart: () => {},
	products: [],
	setProducts: () => {},
})

const mergeCarts = (payload) => {
	let mergedCart = []
	if (payload.currentUserCart.length != 0) {
		mergedCart = [...payload.currentUserCart]
	}

	console.log('payload => ', payload)
	
	if (payload.localCart.length > 0) {
		payload.localCart.forEach((item) => {
			const existingItem = mergedCart.find((cartItem) => cartItem.id === item.id)
			if (existingItem) {
				existingItem.quantity = (existingItem.quantity > item.quantity) ? existingItem.quantity : item.quantity
			} else {
				mergedCart.push(item)
			}
		})
	}
	return mergedCart
}

const fetchLocalCart = () => {
	const localCart = localStorage.getItem('local_cart')
	try{
		return localCart ? JSON.parse(localCart) : []
	} catch (error) {
		return []
	}
}

const ShopProvider = ({ children }) => {

	const { currentUser } = useContext(UserContext)
	const [state, dispatch] = useReducer(shopReducer, initialState)
	
	const [products, setProducts] = useState(() => {[]})
	const [cart, setCart] = useState(state.cart)
	const [userCart, setUserCart] = useState([])


	useEffect(() => {
		if (currentUser && userCart.length > 0) {
			const LocalCart = fetchLocalCart()
			const mergedCart = mergeCarts({ currentUserCart: userCart, localCart: LocalCart })
			dispatch({ type: SHOP_REDUCER_ACTIONS.SET_INITIAL_CART, payload: { cart: mergedCart } })
		}
	}, [userCart])


	useEffect(() => {
		console.log('currentUser => ', state)
		if (currentUser && state.cart.length > 0) {
			console.log('Updating cart data')
			console.log('currentUser => ', currentUser.displayName, state.cart)
			localStorage.setItem('local_cart', JSON.stringify(state.cart))
		}

		const updateCartData = async() => {
			if (cart === undefined || currentUser === null) {
				return;
			}
			await updateUserCart(currentUser, state.cart)
		}

		// Promise.allSettled(updateCartData()).then((results) => {
		// 	results.forEach((result, index) => {
		// 		if (result.status === 'fulfilled') {
		// 			console.log('Cart updated')
		// 			setCart(state.cart)
		// 		}
		// 	})
		// })

	}, [state])

	useEffect(() => {
		localStorage.setItem('local-cart', JSON.stringify(cart))
	}, [cart])


	useEffect(() => {

		const fetchCurrentUserCartData = async () => {
			const fetchedCart = await fecthUserCart(currentUser)
			Promise.allSettled(fetchedCart).then((results) => {
				let cartList = []
				results.forEach((result, index) => {
					if (result.status === 'fulfilled') {
						cartList = [...cartList, result.value]
					}
				})
				setUserCart(cartList || [])
			})
		}
		if (currentUser){
			console.log('Fetching user cart data')
			fetchCurrentUserCartData();
		} else {
			console.log('No user found')
		}


		const fetchProducts = async () => {
			const fetchedProducts = await fetchAllProducts()
			localStorage.setItem('products', JSON.stringify(fetchedProducts))
			setProducts(fetchedProducts)
		}
		fetchProducts()
	}, [])

	return (
		<ShopContext.Provider value={{ cart, setCart, products }}>
			{children}
		</ShopContext.Provider>
	)
}

export { ShopContext, ShopProvider }

ShopProvider.propTypes = {
	children: PropTypes.node.isRequired
}