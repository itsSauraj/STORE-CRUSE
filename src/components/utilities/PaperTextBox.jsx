import React, { useState } from 'react'

import PropTypes from 'prop-types'
import EyeIcon from './svg_icons/EyeIcon'
import EveStashIcon from './svg_icons/EveStashIcon'

const PaperTextBox = ({ 
	required=false,
	type="text", 
	value="", 
	onChange, 
	containerClassName,
	labelClassName,
	inputClassName,
	eyeClassName,
	label, 
	id, 
	name, 
	placeholder,
	status
}) => {

	const [showPassword, setShowPassword] = useState(false)
	
	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className={`flex flex-col w-[100%]`} >
			<div className={`flex flex-col relative	w-[100%]
				${containerClassName}
			`}>
				{label && <label htmlFor={id} className={`
					text-primary dark:text-secondary
					${labelClassName}
				`}>{label}</label>}
				<input
					id={id}
					required={required}
					type = {( type=='password' ) ? showPassword ? 'text' : type : type}
					value={value}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
					className={`
						border-b-2
						border-primary dark:border-secondary
						bg-primary/10  dark:bg-secondary/10
						focus:outline-none w-full
						border-t-[0.5px] border-l-[0.5px] border-r-[0.5px]
						border-t-secondary border-l-secondary border-r-secondary
						dark:border-t-primary dark:border-l-primary dark:border-r-primary
						focus:border-t-[0.5px] focus:border-l-[0.5px] focus:border-r-[0.5px]
						focus:border-t-primary focus:border-l-primary focus:border-r-primary
						focus:dark:border-t-secondary focus:dark:border-l-secondary focus:dark:border-r-secondary
						p-2
						transition-all duration-300 ease-in-out
						placeholder-primary/60 dark:placeholder-secondary/60
						${inputClassName}
					`}
				/>
				{type === 'password' && <div className="absolute left-0 top-0 flex items-center w-full h-full justify-end
					transition-all duration-300 ease-in-out pointer-events-none
				" >
					<i onClick={togglePassword} className='p-2 pointer-events-auto'>
						{
							showPassword ? 
								<EyeIcon
									size="20px"
									clasName={`text-primary dark:text-secondary cursor-pointer w-[10px] h-[10px] pointer-events-auto
										fill-primary dark:fill-secondary
										${eyeClassName}
									`}/> 
								:
								<EveStashIcon
									size="20px"
									className={`text-primary dark:text-secondary cursor-pointer w-[10px] h-[10px] pointer-events-auto
										fill-primary dark:fill-secondary
										${eyeClassName}
									`} />
						}
					</i>
				</div>}
			</div>
			{
				status && (status.message && <p className={`text-[12px] text-error font-[aril]`}>{status.message}</p>)
			}
		</div>
	)
}

export default PaperTextBox

PaperTextBox.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	containerClassName: PropTypes.string,
	labelClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	eyeClassName: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	status: PropTypes.object,
	required: PropTypes.bool
}