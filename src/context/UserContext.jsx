import { createContext, useEffect, useContext, useReducer } from "react"

import { AuthStateChanged, createUserProfileDocument } from "../firebase/filrebase.utils"
import { NotificationContext } from "./NotificationContext"

import PropTypes from 'prop-types'

const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => { },
})

const getCurrentUser = () => {
	const user = localStorage.getItem('user')
	return user ? JSON.parse(user) : null
}

const initialState = {
	currentUser: getCurrentUser(),
}

const USER_ACTIONS = {
	SET_USER: 'SET_USER',
}

const userReducer = (state, action) => {
	switch (action.type) {
	case USER_ACTIONS.SET_USER:
		return {
			...state,
			currentUser: action.payload
		}
	default:
		return state
	}

}

const UserProvider = ({ children }) => {

	const { setNotification } = useContext(NotificationContext)

	const [state, dispatch] = useReducer(userReducer, initialState)
	const { currentUser } = state

	const setCurrentUser = (user) => {
		dispatch({
			type: USER_ACTIONS.SET_USER,
			payload: user
		})
	}

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [currentUser])

	useEffect(() => {
		const unsubscribe = AuthStateChanged((user) => {
			if (user) {
				const userProfile = createUserProfileDocument(user)
				if (userProfile.error) {
					setNotification({
						message: 'Something went wrong',
						status: 'error'
					})
				}
			}
			setCurrentUser(user)
		})

		return () => unsubscribe()
	},[])

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