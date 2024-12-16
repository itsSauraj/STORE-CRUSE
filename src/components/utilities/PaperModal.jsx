import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { IoIosCloseCircle } from "react-icons/io";

import PropTypes from 'prop-types';

const backdropVariants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
};

const modalVariants = {
	hidden: {	
		opacity: 0,
		scale: 0.6,
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: { delay: 0.2 },
	},
	exit: {
		opacity: 0,
		scale: 0.6,
	}
};

const PaperModal = ({ showModal, setShowModal, child }) => {
	return (
		<>
			{showModal && (
				<AnimatePresence mode='wait'>
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={() => setShowModal(false)}
					>
						
						<motion.div
							className="absolute bg-primary dark:bg-secondary p-6 rounded-lg shadow-lg text-secondary dark:text-primary"
							variants={modalVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							onClick={(e) => e.stopPropagation()}
						>
							<div className='absolute top-1 right-1 text-reg-500 
								text-3xl cursor-pointer' onClick={() => setShowModal(false)}>
								<IoIosCloseCircle size={20} className='hover:text-red-500'/>
							</div>
							{child}	
						</motion.div>
					</motion.div>
				</AnimatePresence>
			)}
		</>
	);
};

PaperModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	setShowModal: PropTypes.func.isRequired,
	child: PropTypes.elementType.isRequired,
}

export default PaperModal;