import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const Navbar = React.lazy(() => import('../components/Navbar'))
import ThemeToggle from '../components/ThemeToggle'
import Transition from '../components/Transition'

const Default = () => {

	const location = useLocation()
	const [reload, setReload] = useState(false)

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
		<>
			<ThemeToggle />
			<Navbar />
			{reload ? (
				<Transition component={<Outlet />} />
			) : (
				<Outlet />
			)}
		</>
	)
}

export default Default