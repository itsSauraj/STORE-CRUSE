import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ThemeToggle from '../components/ThemeToggle'

import Navbar from '../components/Navbar'

import Transition from '../components/Transition'

const Auth = () => {

	const location = useLocation()
	const [reload, setReload] = useState(false)

	useEffect(() => {
		setReload(true)
		setTimeout(() => {
			setReload(false)
		}, 1000)
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