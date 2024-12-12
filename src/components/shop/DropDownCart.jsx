import React, { useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import PropTypes from 'prop-types';
import { ShopContext } from '../../context/ShopContext';

import DropDownCard from './DropDownCard';

const DropDownCart = ({ isOpen, setIsOpen }) => {

	const dropdownRef = useRef(null);
	const { cart } = useContext(ShopContext);

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	console.log(cart);

	return (
		<>
			{isOpen && (
				<motion.div
					ref={dropdownRef}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="bg-white shadow-md p-2 fixed md:absolute top-0 md:top-[5rem] md:right-10 
						w-full md:w-[320px] z-50 max-h-[60svh] overflow-y-scroll border-2 border-primary"
				>
					{cart && (
						<div className='flex p-3 flex-col gap-3'>
							<div className='flex z-50  sticky top-0  bg-primary dark:bg-secondary text-secondary dark:text-primary w-[100%] justify-between p-3
								border-[1px] border-secondary dark:border-primary
							'>
								<h3 className="text-lg font-semibold">My Cart</h3>	
								<button className='hover:underline'>Checkout</button>
							</div>
							<div className='flex flex-col gap-3 text-primary'>
								{cart.map((item) => (
									<DropDownCard item={item} key={item.id} />
								))}
							</div>
						</div>
					)}
				</motion.div>
			)}
		</>
	);
};

export default DropDownCart;


DropDownCart.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
}