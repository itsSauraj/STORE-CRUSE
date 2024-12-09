import { motion } from 'framer-motion'

import PaperButton from '../utilities/PaperButton';

import PropTypes from 'prop-types';

import { useState } from 'react';

const Card = ({ item }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

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
                    <span>${item.price}</span>
                </div>
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