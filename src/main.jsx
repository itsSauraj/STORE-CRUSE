import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/UserContext'
import { NotificationProvider } from './context/NotificationContext'
import { ShopProvider } from './context/ShopContext.jsx'


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NotificationProvider>
			<UserProvider>
				<ShopProvider>
					<App />
				</ShopProvider>
			</UserProvider>
		</NotificationProvider>
	</StrictMode>,
)
