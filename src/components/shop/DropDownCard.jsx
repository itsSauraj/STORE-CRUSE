import React, { useState } from 'react'
import { motion } from 'framer-motion'

import PaperButton from '../utilities/PaperButton';

import PropTypes from 'prop-types';

const DropDownCard = ({ item }) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	return (
		<motion.div className='h-[100%] w-[100%] border-[1px]  border-primary flex p-3 gap-4 '>
			{isLoading && (
				<div className='w-[50px] aspect-square bg-secondary dark:bg-primary animate-pulse'></div>
			)}
			<div
				className={`w-[50px] aspect-square  ${isLoading ? 'hidden' : 'relative'}`}
				style={{ backgroundImage: `url(${item.image})`, opacity: isLoading ? 0 : 1 }}
			>
				<img
					src={item.image}
					alt={item.title}
					onLoad={handleImageLoad}
					className={`transition-all absolute w-full h-full duration-300 ease-in ${isLoading ? 'hidden' : 'block'}`}
				/>
			</div>
			<div className='flex justify-between flex-col'>
				<h4 className='truncate w-full'>{item.title}</h4>
				<span>₹{item.price} x {item.quantity} = ₹{item.price*item.quantity}</span>
			</div>
		</motion.div>
	)
}


export default DropDownCard

DropDownCard.propTypes = {
	item: PropTypes.object.isRequired,
};
