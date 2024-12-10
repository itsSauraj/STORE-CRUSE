import React from 'react'
import PropTypes from 'prop-types'

const PaperButton = ({ value, className, onClick, type='button' }) => {
	return (
		<button
			type={type}
			className={`border-[1px] w-[50%]
			hover:bg-primary dark:hover:bg-secondary
			dark:hover:border-primary hover:border-secondary
			hover:text-secondary dark:hover:text-primary
			transition-all duration-300 ease-in delay-100
			dark:hover:bg-slant-lines-primary hover:bg-slant-lines-secondary 
			relative bg-size1
			before:text-center hover:before:flex hover:before:justify-center hover:before:items-center
			hover:before:absolute before:w-full before:h-full before:bg-primary dark:before:bg-secondary 
			before:border-[1px] before:border-secondary dark:before:border-primary before:opacity-0
			before:top-0 before:left-0
			dark:before:text-primary before:text-secondary
			hover:before:translate-x-[3px] hover:before:translate-y-[3px]
			hover:before:content-[attr(data-text)]
			before:transition-[all] before:duration-200 before:ease-in-out hover:before:opacity-100
			${className}`}
			data-text={value}
			onClick={onClick}
		>
			<span className='z-10'>{value}</span>{ }
		</button>
	)
}

export default PaperButton


PaperButton.propTypes = {
	value: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string
}

