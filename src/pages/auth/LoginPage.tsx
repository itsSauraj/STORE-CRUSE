import { useState, useContext, ChangeEvent } from 'react'

import PaperTextBox from '../../components/utilities/PaperTextBox'
import PaperButton from '../../components/utilities/PaperButton'

import { 
	signInWithGooglePopup,
	signInWithEmailPassword,
	checkIfUserPasswordSet,
} from '../../utils/firebase/filrebase.utils'
import { Link } from 'react-router-dom'

import { NotificationContext } from "../../context/NotificationContext"

const LoginPage = () => {

	const { setNotification } = useContext(NotificationContext)

	const [loginFormData, setLoginFormData] = useState({
		email: '',
		password: ''
	})

	const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginFormData({
			...loginFormData,
			[e.target.name]: e.target.value
		})
	}

	const handelSignInWithGoogle = async () => {
		try {
			await signInWithGooglePopup()
		} catch (error) {
			setNotification({
				message: 'Error Logging in with Google',
				status: 'error'
			})
		}
	}

	const handelLoginWithEmailPassword = async () => {
		try{
			await signInWithEmailPassword(loginFormData.email, loginFormData.password)
		} catch (error: any) {
			if (!checkIfUserPasswordSet(loginFormData.email)){
				setNotification({
					message: 'Please enter a password',
					status: 'warning'
				})
			} else {
				if (error.code === 'auth/user-not-found') {
					setNotification({
						message: 'Email not found',
						status: 'error'
					})
				} else if (error.code === 'auth/invalid-email' || 
						error.code === 'auth/wrong-password' || 
						error.code === 'auth/user-disabled' || 
						error.code === 'auth/invalid-credential'
				) {
					setNotification({
						message: 'Invalid Credentials',
						status: 'error'
					})
				} else if(error.code === 'auth/too-many-requests') {
					setNotification({
						message: 'Too many requests, Please try again later',
						status: 'error'
					})
				} else if (error.code === 'auth/missing-password') {
					setNotification({
						message: 'Please enter a password',
						status: 'error'
					})
				}
			}
		}

	}

	return (
		<>
			<div className="flex justify-center items-center flex-grow h-[100%] flex-col">
				<form className='w-[80%] md:w-[50%] lg:w-[30%] flex gap-4 flex-col'>
					<div className='flex justify-center items-center flex-col'>
						<h3 className='text-2xl font-bold'>I already have an account</h3>
						<p className='text-[16.5px] text-light opacity-80'>Sign in with your email and password</p>
					</div>
					<PaperTextBox 
						id={'cruse_email'}
						value={loginFormData.email}
						name={`email`} 
						onChange={handelChange}
						placeholder={`Email`}
					/>
					<PaperTextBox 
						id={'cruse_password'}
						value={loginFormData.password}
						type='password' 
						name={`password`} 
						onChange={handelChange}
						placeholder={`Password`}
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
				<div className='flex flex-col gap-2 p-5'>
					<div className='flex justify-center items-center text-[14px]'>
						Don&apos;t have an account? 
						<Link to={`/auth/signup`} className=' text-[14px] px-1 hover:underline'>Sign Up</Link></div>
					<div className='flex justify-center items-center text-[14px]'>
						<Link to={`/auth/password-reset`} className=' text-[14px] px-1 hover:underline'>Forgot Pawword?</Link></div>
				</div>
			</div>
		</>
	)
}

export default LoginPage