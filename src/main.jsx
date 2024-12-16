import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { NotificationProvider } from './context/NotificationContext'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<NotificationProvider>
				<App />
			</NotificationProvider>
		</ReduxProvider>
	</StrictMode>,
)
