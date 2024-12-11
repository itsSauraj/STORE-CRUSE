import { createContext, useState } from "react"
import { AnimatePresence } from 'framer-motion'
import PaperNotify from '../components/utilities/PaperNotify'

import PropTypes from 'prop-types'

const NotificationContext = createContext({
	notification: null,
	setNotification: () => { },
})

const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState(null)

	return (
		<NotificationContext.Provider value={{ notification, setNotification }}>
			{notification &&
				<AnimatePresence>
					{(notification.message && notification.status) &&
						<PaperNotify
							notifyStatus={notification}
							setNotifyStatus={setNotification}
							duration={3000}
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