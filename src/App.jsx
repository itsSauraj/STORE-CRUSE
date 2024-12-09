import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing Layout Components
import Default from './layouts/Default'
import Auth from './layouts/Auth'

// Importing Pages
import HomePage from './pages/default/HomePage'
import ShopPage from './pages/default/ShopPage'
import AboutPage from './pages/default/AboutPage'
import HelpPage from './pages/default/HelpPage'

import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'

// Importing CSS
import './App.css'
import { AnimatePresence } from "motion/react";

const BrowserRouter = createBrowserRouter([
	{
		path: "/",
		element: <Default />,
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "shop",
				element: <ShopPage />,
			},
			{
				path: "about",
				element: <AboutPage />,
			},
			{
				path: "help",
				element: <HelpPage />,
			},
		]
	},
	{
		path: "auth",
		element: <Auth />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "signup",
				element: <SignUpPage />,
			}
		]
	}
]);



function App() {
	return (
		<AnimatePresence mode="wait">
			<RouterProvider router={BrowserRouter} />
		</AnimatePresence>
	)
}

export default App


