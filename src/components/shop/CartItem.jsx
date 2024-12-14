import React, { useContext } from 'react'
import { FaXmark} from "react-icons/fa6";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { ShopContext } from '../../context/ShopContext'
import { NotificationContext } from '../../context/NotificationContext';

import PropTypes from 'prop-types'

const CartItem = ({ item }) => {

	const { dispatch, SHOP_REDUCER_ACTIONS } = useContext(ShopContext)
	const { setNotification } = useContext(NotificationContext)

	const handleQuantity = (type) => {
		if (type === 'inc') {
			dispatch({
				type: SHOP_REDUCER_ACTIONS.INCREASE_QUANTITY,
				payload: item
			})
		} else {
			dispatch({
				type: SHOP_REDUCER_ACTIONS.DECREASE_QUANTITY,
				payload: item
			})
		}
	}

	const handleRemove = () => {
		dispatch({
			type: SHOP_REDUCER_ACTIONS.REMOVE_FROM_CART,
			payload: item
		})
		setNotification({
			message: `${item.title} removed from cart`,
			status: 'success'
		})
	}

	return (
		<div className='flex p-4 gap-3'>
			<img className='aspect-square w-[100px] md:w-[160px] border-[1.5px] border-primary dark:border-secondary' src={item.image} alt={item.title} />
			<div className='flex flex-col gap-3 flex-grow'>
				<h3 className='w-full text-ellipsis'>{item.title}</h3>
				<div className='hidden md:block w-full text-[12px] text-ellipsis text-primary/70 dark:text-secondary/70'>{item.description}</div>
				<div className='grid grid-cols-3 w-full 	'>
					<div className='flex items-center'>
						<FaCaretLeft className='text-xl cursor-pointer'
							onClick={() => handleQuantity('dec')}
						/>
						{item.quantity}
						<FaCaretRight className='text-xl cursor-pointer'
							onClick={() => handleQuantity('inc')}
						/>
					</div>
					<div className='text-center'>₹{item.price * item.quantity}</div>
					<div className='flex justify-end items-center'>
						<FaXmark className='cursor-pointer'
							onClick={handleRemove}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItem

CartItem.propTypes = {
	item: PropTypes.object.isRequired,
}