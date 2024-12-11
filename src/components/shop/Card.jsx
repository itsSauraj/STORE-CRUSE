import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'

import PaperButton from '../utilities/PaperButton';

import PropTypes from 'prop-types';

import { NotificationContext } from '../../context/NotificationContext';
import { ShopContext } from '../../context/ShopContext';

const Card = ({ item }) => {
	const [isLoading, setIsLoading] = useState(true);

	const { setNotification } = useContext(NotificationContext);
	const { cart, setCart } = useContext(ShopContext);

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleAddToCart = () => {
		const updatedCart = cart || [];
		const itemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
		if (itemIndex === -1) {
			setCart([...updatedCart, { ...item, quantity: 1 }]);
		} else {
			const newCart = updatedCart.map((cartItem) => {
				if (cartItem.id === item.id) {
					return { ...cartItem, quantity: cartItem.quantity + 1 };
				}
				return cartItem;
			});
			setCart(newCart);
		}
		setNotification({
			message: 'Item added to cart',
			status: 'success',
		});
	}

	return (
		<motion.div
			className='flex justify-center items-center h-[320px] lg:h-max bg-primary
				dark:bg-secondary shadow-lg p-3 text-secondary dark:text-primary'
			data-item-id={item.id}
		>
			<div className='h-[100%] w-[100%] border-[1px] border-secondary dark:border-primary flex flex-col p-3 justify-between gap-4'>
				{isLoading && (
					<div className='h-[70%] sm:h-[70%] md:h-[80%] lg:h-[70%] xl-[80%] w-[100%] aspect-video bg-secondary dark:bg-primary animate-pulse'></div>
				)}
				<img
					src={item.image}
					alt={item.title}
					className={`h-[70%] sm:h-[70%] md:h-[80%] lg:h-[70%] xl-[80%] w-[100%] aspect-video transition-all duration-300 ease-in ${isLoading ? 'hidden' : 'block'}`}
					style={{ opacity: isLoading ? 0 : 1 }}
					onLoad={handleImageLoad}
				/>
				<div className='flex justify-between'>
					<h4 className='truncate w-[80%]'>{item.title}</h4>
					<span>₹ {item.price}</span>
				</div>
				<div className='flex gap-4 justify-between items-bottom flex-grow w-full relative'>
					<PaperButton value='Add to Cart' className='border-secondary dark:border-primary' onClick={handleAddToCart}/>
					<PaperButton value='Buy Now' className='border-secondary dark:border-primary'/>
				</div>
			</div>
		</motion.div>
	)
}


export default Card

Card.propTypes = {
	item: PropTypes.object.isRequired,
};
