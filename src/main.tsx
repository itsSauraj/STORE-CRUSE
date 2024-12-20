import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { NotificationProvider } from './context/NotificationContext'

import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store.js'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripePromise, stripeOptions } from './utils/stripe/stripe.confige.js'

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<NotificationProvider>
						<Elements stripe={loadStripePromise} options={stripeOptions}>	
							<App />
						</Elements>
					</NotificationProvider>
				</PersistGate>
			</ReduxProvider>
		</StrictMode>
	)
}
