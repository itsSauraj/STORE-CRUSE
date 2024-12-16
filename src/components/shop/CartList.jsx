import React, { useContext, Fragment } from 'react'

import { NotificationContext } from '../../context/NotificationContext'

import CartItem from './CartItem'

import PaperButton from '../utilities/PaperButton'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/slices/shop.slice'


const CartList = () => {
	const { cart } = useSelector(state => state.shop)
	const dispatch = useDispatch()

	const { setNotification } = useContext(NotificationContext)

	const handelClearCart = () => {
		dispatch(clearCart())
		setNotification({
			message: 'Cart Cleared',
			status: 'success'
		})
	}

	const total = {
		price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
		quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
	}

	return (
		<div className='w-full md:w-[70%] lg:w-[50%]'>
			<hr className='bg-primary dark:bg-secondary h-[2px] mt-3'/>
			{cart.map((item) => (
				<Fragment key={item.id}>
					<CartItem item={item}/>
					<hr className='bg-primary dark:bg-secondary h-[2px]'/>
				</Fragment>
			))}
			<div className='flex p-7 gap-4 justify-end'>	
				<PaperButton 
					value='Clear Cart'
					className="
						dark:border-primary border-secondary
						bg-primary dark:bg-secondary
						text-secondary dark:text-primary
						p-3 w-[160px]
					"
					onClick={handelClearCart}
				/>
				<PaperButton 
					className="
						dark:border-primary border-secondary
						bg-primary dark:bg-secondary
						text-secondary dark:text-primary
						p-3 w-[160px]
					"
					value={`Checkout - ₹${total.price}`}
				/>
			</div>
		</div>
	)
}

export default CartList