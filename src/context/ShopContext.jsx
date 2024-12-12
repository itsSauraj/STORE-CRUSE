import { createContext, useState, useEffect, useContext, useReducer } from "react"
import { fetchAllProducts, fecthUserCart, updateUserCart } from "../firebase/shop.utils"

import { UserContext } from "./UserContext"
import {
	initialState,
	shopReducer,
	SHOP_REDUCER_ACTIONS,
	updateCartData as updateCartDataFunc,
} from "./ShopReducerFunctions"

import PropTypes from 'prop-types'

const ShopContext = createContext({
	cart: [],
	setCart: () => {},
	products: [],
	setProducts: () => {},
})

const ShopProvider = ({ children }) => {

	const { currentUser } = useContext(UserContext)
	
	const [products, setProducts] = useState(() => {[]})
	const [cart, setCart] = useState([])
	const [ userCart, setUserCart ] = useState([])

	const [state, dispatch] = useReducer(shopReducer, initialState)

	useEffect(() => {
		if (userCart.length > 0) {
			dispatch({
				type: SHOP_REDUCER_ACTIONS.INITIALIZE,
				payload: userCart
			})
		}
	}, [userCart])

	useEffect(() => {
		const updateStateOnServer = async () => {
			await updateCartDataFunc(currentUser, state.cart)
		}
		updateStateOnServer()
	}, [state])

	useEffect(() => {

		const fetchCurrentUserCartData = async () => {
			const Cart = await fecthUserCart(currentUser)
			setUserCart(Cart)
		}
		if (currentUser) {
			fetchCurrentUserCartData()
		}


		const fetchProducts = async () => {
			const fetchedProducts = await fetchAllProducts()
			setProducts(fetchedProducts)
		}
		fetchProducts()

		try{
			const local_cart = JSON.parse(localStorage.getItem('local-cart'))
			if (local_cart.length > 0) {
				setCart(local_cart)
			}
			if (currentUser){
				const userCart = async () => {
					const newV = await fecthUserCart(currentUser)
					setCart(newV)
				}
				userCart()
			}
		} catch (error){
			if (currentUser){
				const userCart = async () => {
					const newV = await fecthUserCart(currentUser)
					setCart(newV)
				}
				userCart()
			}
		}
	}, [])


	const updateCartData = async() => {
		if (cart === undefined || currentUser === null) {
			return;
		}
		await updateUserCart(currentUser, cart)
	}

	const fetchUserCartContext = async () => {

		const userCart = await fecthUserCart(currentUser)
		const mergedCart = [...userCart];

		if ( cart.length > 0) {
			cart.forEach((item) => {
				const existingItem = mergedCart.find((cartItem) => cartItem.id === item.id)
				if (existingItem) {
					existingItem.quantity = item.quantity
				} else {
					mergedCart.push(item)
				}
			})
		}
		setCart(mergedCart)
	}

	useEffect(() => {
		if (currentUser){
			fetchUserCartContext()
		}

		return () => {
			if (currentUser){
				fetchUserCartContext()
			}
		}

	}, [currentUser])


	useEffect(() => {
		localStorage.setItem('local-cart', JSON.stringify(cart))
		if (currentUser) {
			updateCartData()
		}

		return () => {
			updateCartData()
		}

	}, [cart])

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