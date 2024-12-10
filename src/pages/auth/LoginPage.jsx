import { useEffect, useState } from 'react'

import PaperTextBox from '../../components/utilities/PaperTextBox'
import PaperButton from '../../components/utilities/PaperButton'

import { auth, signInWithGooglePopup, createUserProfileDocument, signInWithEmailPassword } from '../../firebase/utils'
import { getRedirectResult } from 'firebase/auth'
import { Link } from 'react-router-dom'

const LoginPage = () => {

	useEffect(() => {
		const fetchRedirectResult = async () => {
			try {
				const response = await getRedirectResult(auth);
				console.log(response);
			} catch (error) {
				console.error("Error fetching redirect result:", error);
			}
		};
		
		fetchRedirectResult();
	}, []);

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
	const [message, setMessage] = useState('Name will appear here')

	const handelSignInWithGoogle = async () => {
		try {
			const { user } = await signInWithGooglePopup()
			const loginData = await createUserProfileDocument(user)
			if (loginData.error) {
				console.log('Error Logging in with Google', loginData.error)
			}
			setMessage(user.displayName)
		} catch (error) {
			console.log('Error Signing in with Google', error.message)
		}
	}

	const handelLoginWithEmailPassword = async () => {
		const { user } = await signInWithEmailPassword(loginFormData.email, loginFormData.password)
	}

	return (
		<div className="flex justify-center items-center flex-grow h-[100%] flex-col">
			<form className='w-[80%] md:w-[50%] lg:w-[30%] flex gap-4 flex-col'>
				<div className='flex justify-center items-center flex-col'>
					<h3 className='text-2xl font-bold'>I already have an account</h3>
					<p className='text-[16.5px] text-light opacity-80'>Sign in with your email and password</p>
				</div>
				<span>{message}</span>
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
							handelLoginWithEmailPassword()
						}}
						className='
							bg-primary dark:bg-secondary text-secondary dark:text-primary
							text-xl py-2 hover:before:text-lg
						'
					/>
					<PaperButton 
						value={'Login with Google'}
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
				Don't have an account? 
				<Link to={`/auth/signup`} className=' text-[14px] px-1 hover:underline'>Sign Up</Link></div>
		</div>
	)
}

export default LoginPage