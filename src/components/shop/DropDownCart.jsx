import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import PropTypes from 'prop-types';

const DropDownCart = ({ isOpen, setIsOpen }) => {

	const dropdownRef = useRef(null);

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

	return (
		<>
			{isOpen && (
				<motion.div
					ref={dropdownRef}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="bg-white shadow-md p-4 absolute top-0 right-0 md:top-[5rem] md:right-10 w-full md:w-[320px] z-50"
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi quaerat odio at, corporis exercitationem quibusdam perspiciatis totam fugit ratione. Nesciunt, similique, explicabo voluptatem placeat nostrum ipsa sint ut ipsam itaque harum vero. Perferendis magnam odit sequi qui obcaecati accusantium minus nostrum quod, tempore enim, voluptate consequuntur. Officia qui voluptates, non eos facere laudantium quaerat. Excepturi laborum rerum reiciendis aspernatur eos libero eum accusantium quam repellat consectetur nemo eveniet sed, illo molestias at vero soluta possimus reprehenderit placeat doloribus in repellendus commodi. In repellat unde est eos, perspiciatis corrupti quaerat iure reiciendis distinctio culpa eligendi repudiandae necessitatibus. Rerum, architecto a.

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