import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/UserContext'
import { NotificationProvider } from './context/NotificationContext'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NotificationProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</NotificationProvider>
	</StrictMode>,
)
