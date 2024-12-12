import React, { useContext } from 'react'
import { FaXmark} from "react-icons/fa6";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { ShopContext } from '../../context/ShopContext'
import { NotificationContext } from '../../context/NotificationContext';

import PropTypes from 'prop-types'

const CartItem = ({ item }) => {

	const { setCart } = useContext(ShopContext)
	const { setNotification } = useContext(NotificationContext)

	const handleQuantity = (type) => {
		if (type === 'inc') {
			setCart((prev) => prev.map((cartItem) => {
				if (cartItem.id === item.id) {
					return { ...cartItem, quantity: cartItem.quantity + 1 }
				}
				return cartItem
			}))
		} else {
			setCart((prev) => prev.reduce((acc, cartItem) => {
				if (cartItem.id === item.id) {
					const newQuantity = cartItem.quantity - 1;
					if (newQuantity > 0) {
						acc.push({ ...cartItem, quantity: newQuantity });
					}
				} else {
					acc.push(cartItem);
				}
				return acc;
			}, []))
		}
	}


	const handleRemove = () => {
		setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id))
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