import React from 'react'

import CartList from '../../components/shop/CartList'

const Checkout = () => {
	return (
		<>
			<h2 className="text-center text-3xl uppercase">My Cart</h2>
			<div className='flex justify-center'>
				<CartList />
			</div>
		</>
	)
}

export default Checkout