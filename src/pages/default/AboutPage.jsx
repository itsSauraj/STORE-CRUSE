import { useContext } from "react"

import { NotificationContext } from "../../context/NotificationContext"

const AboutPage = () => {

	const { setNotification } = useContext(NotificationContext)

	const ShoWNotification = () => {
		setNotification({
			message: 'This is a notification message',
			status: 'success'
		})
	}

	const ShoWNotification2 = () => {
		setNotification({
			message: 'This is a notification message',
			status: 'Erroe'
		})
	}

	return (
		<>
			<h1>About Page</h1>
			<button onClick={ShoWNotification} className="bg-primary py-4 px-6 text-secondary m-4 hover:opacity-80 transition-all ease-in suration-300">Show Notification</button>
			<button onClick={ShoWNotification2} className="bg-primary py-4 px-6 text-secondary m-4 hover:opacity-80 transition-all ease-in suration-300">Show Notification</button>
		</>
	)
}


export default AboutPage