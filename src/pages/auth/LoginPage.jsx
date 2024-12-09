import { useState } from 'react'

import PaperTextBox from '../../components/utilities/PaperTextBox'
import PaperButton from '../../components/utilities/PaperButton'

const LoginPage = () => {

	const [loginFormData, setLoginFormData] = useState({
		email: '',
		password: ''
	})

	const [status, setStatus] = useState({
		// 'email': {
		// 	message: 'Invalid Email',
		// 	status: 'error'
		// },
	})

	const handelChange = (e) => {
		setLoginFormData({
			...loginFormData,
			[e.target.name]: e.target.value
		})
	}

	return (
		<div className="flex justify-center items-center flex-grow h-[100%]">
			<form className='w-[80%] md:w-[50%] lg:w-[30%] flex gap-4 flex-col'>
				<div className='flex justify-center items-center flex-col'>
					<h3 className='text-2xl font-bold'>I already have an account</h3>
					<p className='text-[16.5px] text-light opacity-80'>Sign in with your email and password</p>
				</div>
				<PaperTextBox 
					// label={'Email'}
					id={'cruse_email'}
					value={loginFormData.email}
					name={`email`} 
					onChange={handelChange}
					placeholder={`Email`}
					status={status.email}
				/>
				<PaperTextBox 
					// label={'Password'}
					id={'cruse_password'}
					value={loginFormData.password}
					type='password' 
					name={`password`} 
					onChange={handelChange}
					placeholder={`Password`}
					status={status.password && status.password}
				/>
				<div className='flex gap-4'>

					<PaperButton 
						value={'Login'}
						onClick={(e) => {
							e.preventDefault()
							console.log('Login Clicked')
						}}
						className='
							bg-primary dark:bg-secondary text-secondary dark:text-primary
							text-xl py-2 hover:before:text-xl
						'
					/>
					<PaperButton 
						value={'Login with Google'}
						onClick={(e) => {
							e.preventDefault()
							console.log('Login Clicked')
						}}
						className='
						border-color-primary dark:border-color-secondary border-2
						hover:before:border-primary hover:before:dark:border-secondary
						hover:before:bg-secondary hover:before:dark:bg-primary
						hover:before:text-primary hover:before:dark:text-secondary
						text-xl py-2 hover:before:text-xl
						'
					/>
				</div>
			</form>
		</div>
	)
}

export default LoginPage