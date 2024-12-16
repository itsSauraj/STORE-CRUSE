import { createBrowserRouter, RouterProvider } from "react-router-dom";


import { useEffect, useContext } from "react"
import { AuthStateChanged, createUserProfileDocument } from "./firebase/filrebase.utils"

import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/slices/user/user.action"

// Importing Layout Components
import Default from './layouts/Default'
import Auth from './layouts/Auth'

// Importing Pages
import HomePage from './pages/default/HomePage'
import ShopPage from './pages/default/ShopPage'
import Checkout from "./pages/default/Checkout";

import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import PasswordResetPage from './pages/auth/PasswordResetPage'

// Importing CSS
import './App.css'
import { AnimatePresence } from "motion/react";
import { NotificationContext } from "./context/NotificationContext";

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
				path: "checkout",
				element: <Checkout />,
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
			},
			{
				path: "password-reset",
				element: <PasswordResetPage />,
			}
		]
	}
]);



function App() {

	const { setNotification } = useContext(NotificationContext)
	const dispatch = useDispatch()

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
			dispatch(setCurrentUser(user))
		})
		console.log(unsubscribe);
		return () => unsubscribe()
	},[])

	return (
		<AnimatePresence mode="wait">
			<RouterProvider router={BrowserRouter} />
		</AnimatePresence>
	)
}

export default App


