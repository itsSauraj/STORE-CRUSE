import { useEffect, useState } from 'react'

import PaperTextBox from '../../components/utilities/PaperTextBox'
import PaperButton from '../../components/utilities/PaperButton'

import { signInWithGooglePopup, createUserProfileDocument, CreateCustomUser} from '../../firebase/utils'
import { Link } from 'react-router-dom'

const SignUpPage = () => {

	const [loginFormData, setLoginFormData] = useState({
		displayName: '',
		email: '',
		password1: '',
		password2: ''
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

	const checkPassword = () => {
		if (loginFormData.password1 !== loginFormData.password2) {
			setStatus({
				...status,
				password2: {
					message: 'Password does not match',
					status: 'error'
				}
			})
			return false
		} else {
			setStatus({
				...status,
				password2: null
			})
		}
		return true
	}

	const validatePassword = () => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

		if (!passwordRegex.test(loginFormData.password1) && loginFormData.password1.length > 0) {
			setStatus({
				...status,
				password1: {
					message: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols',
					status: 'error'
				}
			})
			return false
		} else {
			setStatus({
				...status,
				password1: null
			})
		}

	}

	useEffect(() => {
		checkPassword()
		
		return () => {
			checkPassword()
		}
	}, [loginFormData.password1, loginFormData.password2])

	useEffect(() => {
		validatePassword()
		
		return () => {
			validatePassword()
		}
	}, [loginFormData.password1])

	const handelSignInWithGoogle = async () => {
		try {
			const { user } = await signInWithGooglePopup()
			await createUserProfileDocument(user)
		} catch (error) {
			console.log('Error Signing in with Google', error.message)
		}
	}

	const handelFormSubmit = async () => {			
		if (!status.password1 && !status.password2) {
			const user = await CreateCustomUser(loginFormData)
			console.log('User Created', user)
		} else {
			console.log('Error Creating User')
		}
	}


	return (
		<div className="flex justify-center items-center flex-grow h-[100%] flex-col">
			<form className='w-[80%] md:w-[50%] lg:w-[30%] flex gap-4 flex-col'>
				<div className='flex justify-center items-center flex-col'>
					<h3 className='text-2xl font-bold'>Don't hava an account</h3>
					<p className='text-[16.5px] text-light opacity-80'>Sign up now</p>
				</div>
				<PaperTextBox 
					// label={'Full Name'}
					id={'cruse_displayName'}
					value={loginFormData.displayName}
					name={`displayName`} 
					onChange={handelChange}
					placeholder={`Full name`}
					status={status.displayName}
				/>
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
					id={'cruse_password1'}
					value={loginFormData.password1}
					type='password' 
					name={`password1`} 
					onChange={handelChange}
					placeholder={`Password`}
					status={status.password1 && status.password1}
				/>
				<PaperTextBox 
					// label={'Confirm Password'}
					id={'cruse_password2'}
					value={loginFormData.password2}
					type='password' 
					name={`password2`} 
					onChange={handelChange}
					placeholder={`Confirm Password`}
					status={status.password2 && status.password2}
				/>
				<div className='flex gap-4'>

					<PaperButton 
						value={'Sign Up'}
						onClick={(e) => {
							e.preventDefault()
							handelFormSubmit()
						}}
						className='
							bg-primary dark:bg-secondary text-secondary dark:text-primary
							text-xl py-2 hover:before:text-lg
						'
					/>
					<PaperButton 
						value={'Sign Up with Google'}
						onClick={(e) => {
							e.preventDefault()
							handelSignInWithGoogle()
						}}
						className='
						border-color-primary dark:border-color-secondary border-2
						hover:before:border-primary hover:before:dark:border-secondary
						hover:before:bg-secondary hover:before:dark:bg-primary
						hover:before:text-primary hover:before:dark:text-secondary
						text-xl py-2 hover:before:text-lg

						hover:bg-secondary dark:hover:bg-primary
						dark:hover:bg-slant-lines-secondary hover:bg-slant-lines-primary
						transition-none
						'
					/>
				</div>
			</form>
			<div className='flex justify-center items-center text-[14px] p-5'>
				Already have an account?
				<Link to={`/auth/login`} className=' text-[14px] px-1 hover:underline'>Sign In</Link></div>
		</div>
	)
}

export default SignUpPage