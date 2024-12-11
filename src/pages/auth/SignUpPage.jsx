import { useEffect, useState, useContext } from 'react'

import PaperTextBox from '../../components/utilities/PaperTextBox'
import PaperButton from '../../components/utilities/PaperButton'

import { signInWithGooglePopup, CreateCustomUser } from '../../firebase/filrebase.utils'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from "../../context/NotificationContext"

const SignUpPage = () => {

	const navigate = useNavigate()
	const { setNotification } = useContext(NotificationContext)

	const [loginFormData, setLoginFormData] = useState({
		displayName: '',
		email: '',
		password1: '',
		password2: ''
	})

	const resetForm = () => {
		setLoginFormData({
			displayName: '',
			email: '',
			password1: '',
			password2: ''
		})
	}

	const [status, setStatus] = useState({})

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
			checkPassword
		}
	}, [loginFormData.password1, loginFormData.password2])

	useEffect(() => {
		validatePassword()

		return () => {
			validatePassword
		}
	}, [loginFormData.password1])

	const handelSignInWithGoogle = async () => {
		try {
			await signInWithGooglePopup()
			resetForm()
		} catch (error) {
			setNotification({
				message: 'Error Signing in with Google',
				status: 'error'
			})
		}
	}

	const handelFormSubmit = async (e) => {
		e.preventDefault()
		
		if (!status.password1 && !status.password2) {
			try{
				const status = await CreateCustomUser(loginFormData)
				if (status.error) {
					setNotification({
						message: "Emali already exists please login",
						status: 'error'
					})
					navigate('/auth/login')
				}
			} catch (error) {
				setNotification({
					message: 'Error Creating User',
					status: 'error'
				})
			}
		} else {
			setNotification({
				message: 'Please check the form for errors',
				status: 'error'
			})
		}
	}


	return (
		<>
			<div className="flex justify-center items-center flex-grow h-[100%] flex-col">
				<form className='w-[80%] md:w-[50%] lg:w-[30%] flex gap-4 flex-col' onSubmit={handelFormSubmit}>
					<div className='flex justify-center items-center flex-col'>
						<h3 className='text-2xl font-bold'>Don&apos;t hava an account</h3>
						<p className='text-[16.5px] text-light opacity-80'>Sign up now</p>
					</div>
					<PaperTextBox
						// label={'Full Name'}
						required={true}
						id={'cruse_displayName'}
						value={loginFormData.displayName}
						name={`displayName`}
						onChange={handelChange}
						placeholder={`Full name*`}
						status={status.displayName}
					/>
					<PaperTextBox
						// label={'Email'}
						required={true}
						id={'cruse_email'}
						value={loginFormData.email}
						name={`email`}
						onChange={handelChange}
						placeholder={`Email*`}
						status={status.email}
					/>
					<PaperTextBox
						// label={'Password'}
						required={true}
						id={'cruse_password1'}
						value={loginFormData.password1}
						type='password'
						name={`password1`}
						onChange={handelChange}
						placeholder={`Password*`}
						status={status.password1 && status.password1}
					/>
					<PaperTextBox
						// label={'Confirm Password'}
						required={true}
						id={'cruse_password2'}
						value={loginFormData.password2}
						type='password'
						name={`password2`}
						onChange={handelChange}
						placeholder={`Confirm Password*`}
						status={status.password2 && status.password2}
					/>
					<div className='flex gap-4'>

						<PaperButton
							value={'Sign Up'}
							type='submit'
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
		</>
	)
}

export default SignUpPage