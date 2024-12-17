import React, { useState } from 'react'

import CartList from '../../components/shop/CartList'
import PaperModal from '../../components/utilities/PaperModal'

import CheckOutModal from '../../components/shop/CheckOutModal'

import { useSelector } from 'react-redux'
import { ShopState } from '../../types/shop.interface'

const Checkout = () => {

	const [showModal, setShowModal] = useState(false)
	const { cart, isCartLoading, errorLoadingCart } = 
		useSelector((state: { shop: ShopState }) => state.shop)

	const total = {
		price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
		quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
	}

	return (
		<>
			<h2 className="text-center text-3xl uppercase">My Cart</h2>
			<div className='flex justify-center'>
				<CartList 
					setShowModal={setShowModal}
					cart={cart}
					isCartLoading={isCartLoading}
					errorLoadingCart={errorLoadingCart}
				/>
			</div>
			<PaperModal 
				showModal={showModal}
				setShowModal={setShowModal}
				child={<CheckOutModal total_amount={total.price}/>}
			/>
		</>
	)
}

export default Checkout