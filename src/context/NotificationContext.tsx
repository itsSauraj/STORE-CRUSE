import { createContext, useReducer, ReactNode } from "react"
import { AnimatePresence } from 'framer-motion'
import PaperNotify from '../components/utilities/PaperNotify'

import { notificationReducer, initialState, showNotification, TypeNotification } from './NotificationReducer'


const NotificationContext = createContext<{
	notification: TypeNotification | null;
	setNotification: (notification: TypeNotification) => void;
}>({
	notification: null,
	setNotification: () => {},
})

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

	const [state, dispatch] = useReducer(notificationReducer, initialState)
	const { notification = null, duration } = state

	const setNotification = (notification : TypeNotification) => {
		dispatch(showNotification(notification) as any)
	}

	const values = {
		notification,
		setNotification
	}

	return (
		<NotificationContext.Provider value={{ ...values }}>
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