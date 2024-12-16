import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import ThemeToggle from '../components/ThemeToggle'

import Navbar from '../components/Navbar'

import Transition from '../components/Transition'

import { useSelector } from 'react-redux'

const Auth = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const [reload, setReload] = useState(false)

	const currentUser = useSelector(state => state.user.currentUser)

	useEffect(() => {
		if (currentUser) {
			navigate('/')
		}
	}, [currentUser])


	useEffect(() => {
		setReload(true)
		setTimeout(() => {
			setReload(false)
		}, 1000)

		return () => {
			setReload
		}
	}, [location])

	return (
		<div className='flex flex-col h-[100svh]'>
			<ThemeToggle />	
			<Navbar />
			{reload ? (
				<Transition component={<Outlet />} />
			) : (
				<Outlet />
			)}
		</div>

	)
}

export default Auth