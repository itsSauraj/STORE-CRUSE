import { createContext, useState, useEffect } from "react"

import PropTypes from 'prop-types'

const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
})

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(() => {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	})

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [currentUser])

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }

UserProvider.propTypes = {
	children: PropTypes.node.isRequired
}