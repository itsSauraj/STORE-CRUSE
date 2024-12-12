import { createContext, useReducer } from "react"
import { AnimatePresence } from 'framer-motion'
import PaperNotify from '../components/utilities/PaperNotify'

import PropTypes from 'prop-types'

const NotificationContext = createContext({
	notification: null,
	setNotification: () => {},
})

const initialState = {
	notification : null,
	duration: 3000
}

const NOTIFICATION_ACTIONS = {
	SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
	SET_DURATION: 'SET_DURATION',
}

const notificationReducer = (state, action) => {
	switch (action.type) {
	case NOTIFICATION_ACTIONS.SHOW_NOTIFICATION:
		return {
			...state,
			notification: action.payload
		}
	case NOTIFICATION_ACTIONS.SET_DURATION:
		return {
			...state,
			duration: action.payload
		}
	default:
		return state
	}
}


const NotificationProvider = ({ children }) => {

	const [state, dispatch] = useReducer(notificationReducer, initialState)
	const { notification, duration } = state

	const setNotification = (notification) => {
		dispatch({
			type: NOTIFICATION_ACTIONS.SHOW_NOTIFICATION,
			payload: notification
		})
	}

	return (
		<NotificationContext.Provider value={{ notification, setNotification }}>
			{notification &&
				<AnimatePresence>
					{(notification.message && notification.status) &&
						<PaperNotify
							notifyStatus={notification}
							setNotifyStatus={setNotification}
							duration={duration}
						/>}
				</AnimatePresence>
			}
			{children}
		</NotificationContext.Provider>
	)
}

export { NotificationContext, NotificationProvider }

NotificationProvider.propTypes = {
	children: PropTypes.node.isRequired
}