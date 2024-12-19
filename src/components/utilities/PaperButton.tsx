import React, { ChangeEvent } from 'react'
import { FallingLines } from 'react-loader-spinner'

interface PaperButtonProps {
	value: string;
	className?: string;
	onClick?: (event: ChangeEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
}

const PaperButton: React.FC<PaperButtonProps> = ({ value, className, onClick, type='button', isLoading=false }) => {

	return (
		<button
			type={type}
			className={`border-[1px] w-[50%]

			${ !isLoading && 'hover:bg-primary dark:hover:bg-secondary \
			dark:hover:border-primary hover:border-secondary \
			hover:text-secondary dark:hover:text-primary'}
			transition-all duration-300 ease-in delay-100
			relative bg-size1 before:text-center before:hidden 
			${ !isLoading && 'dark:hover:bg-slant-lines-primary hover:bg-slant-lines-secondary \
			hover:before:flex hover:before:justify-center hover:before:items-center \
			hover:before:absolute'} before:w-full before:h-full before:bg-primary dark:before:bg-secondary 
			before:border-[1px] before:border-secondary dark:before:border-primary before:opacity-0
			before:top-0 before:left-0
			dark:before:text-primary before:text-secondary
			${ !isLoading && 'hover:before:translate-x-[3px] hover:before:translate-y-[3px] \
			hover:before:content-[attr(data-text)] hover:before:opacity-100'}
			before:transition-[all] before:duration-200 before:ease-in-out 
			${className}`}
			data-text={value}
			onClick={onClick}
			disabled={isLoading}
		>
			{!isLoading ? 
				(<span className='z-10'>{value}</span>):
				<div className='z-10 w-full flex justify-center items-center'>
					<FallingLines
						color="#4fa94d"
						width="30"
						height='30'
						visible={true}
					/>
				</div>
			}
		</button>
	)
}

export default PaperButton