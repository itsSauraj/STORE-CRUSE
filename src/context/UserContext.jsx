import { createContext, useState, useEffect, useContext } from "react"

import { AuthStateChanged, createUserProfileDocument } from "../firebase/utils"
import { NotificationContext } from "./NotificationContext"

import PropTypes from 'prop-types'

const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => {},
})

const UserProvider = ({ children }) => {

	const { setNotification } = useContext(NotificationContext)

	const [currentUser, setCurrentUser] = useState(() => {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	})

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [currentUser])

	useEffect(() => {
		const unsubscribe = AuthStateChanged((user) => {
			if (user) {
				const userProfile = createUserProfileDocument(user)
				if (userProfile.error){
					setNotification({
						message: 'Something went wrong',
						status: 'error'
					})
				}
			}
			setCurrentUser(user)
		})

		return () => unsubscribe()
	},)

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