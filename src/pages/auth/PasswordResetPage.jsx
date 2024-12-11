import { useState, useContext } from 'react'

import PaperTextBox from '../../components/utilities/PaperTextBox'
import PaperButton from '../../components/utilities/PaperButton'

import { sendPasswordResetEmailToUser } from '../../firebase/filrebase.utils'
import { Link } from 'react-router-dom'

import { NotificationContext } from "../../context/NotificationContext"

const PasswordResetPage = () => {

	const { setNotification } = useContext(NotificationContext)

	const [email, setEmail] = useState('')

	const handelChange = (e) => {
		setEmail(e.target.value)
	}

	const handelPasswordReset = async () => {
		try{
			await sendPasswordResetEmailToUser(email)
			setNotification({
				message: 'Password reset email sent',
				status: 'success'
			})
		} catch (error) {
			setNotification({
				message: 'Error sending password reset email',
				status: 'error'
			})
		}

	}

	return (
		<>
			<div className="flex justify-center items-center flex-grow h-[100%] flex-col">
				<form className='w-[80%] md:w-[50%] lg:w-[30%] flex gap-4 flex-col'>
					<div className='flex justify-center items-center flex-col'>
						<h3 className='text-2xl font-bold'>Forgot Password?</h3>
						<p className='text-[16.5px] text-light opacity-80'>Reset password now</p>
					</div>
					<PaperTextBox 
						// label={'Email'}
						id={'cruse_email'}
						value={email}
						name={`email`} 
						onChange={handelChange}
						placeholder={`Email`}
					/>
					<PaperButton 
						value={'Reset Password'}
						onClick={(e) => {
							e.preventDefault()
							handelPasswordReset()
						}}
						className='
							bg-primary dark:bg-secondary text-secondary dark:text-primary
							text-xl py-2 hover:before:text-lg w-full'
					/>
				</form>
				<div className='flex flex-col gap-2 p-5'>
					<div className='flex justify-center items-center text-[14px]'>
						Already have an account?
						<Link to={`/auth/login`} className=' text-[14px] px-1 hover:underline'>Sign In</Link></div>
					<div className='flex justify-center items-center text-[14px]'>
						Don&apos;t have an account? 
						<Link to={`/auth/signup`} className=' text-[14px] px-1 hover:underline'>Sign Up</Link></div>
				</div>
			</div>
		</>
	)
}

export default PasswordResetPage