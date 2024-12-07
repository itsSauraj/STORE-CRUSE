import { motion } from 'framer-motion'

import PaperButton from '../utilities/PaperButton';

import PropTypes from 'prop-types';

const Card = ({ item }) => {
  return (
    <motion.div
        className='flex justify-center items-center h-[280px] bg-primary
        dark:bg-secondary shadow-lg p-3 text-secondary dark:text-primary'
        data-item-id={item.id}
    >
        <div className='h-[100%] w-[100%] border-[1px] border-secondary dark:border-primary flex flex-col p-3 justify-between gap-4'>
            <img src={item.image} alt={item.title} className='h-[80%] w-[100%]' />
            <div className='flex gap-4 justify-between items-bottom flex-grow w-full relative'>
                <PaperButton value='Add to Cart' />
                <PaperButton value='Buy Now' />
            </div>
        </div>
    </motion.div>
  )
}

export default Card

Card.propTypes = {
    item: PropTypes.object.isRequired,
};

// id: 5,
// title: 'Product 5',
// price: 500,
// image: 'https://via.placeholder.com/150',    
// category: ['mens', 'trousers']

