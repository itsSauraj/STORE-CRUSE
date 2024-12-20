import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useEffect, useContext } from "react"
import { AuthStateChanged, createUserProfileDocumentOrGetProfile } from "./utils/firebase/filrebase.utils"

import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/user.slice";
import { setInitialCart, setInitialProductsAsync } from "./redux/slices/shop.slice";

// Importing Layout Components
const Default = React.lazy(() => import('./layouts/Default'));
const Auth = React.lazy(() => import('./layouts/Auth'));

// Importing Pages
const HomePage = React.lazy(() => import('./pages/default/HomePage'));
const ShopPage = React.lazy(() => import('./pages/default/ShopPage'));
const Checkout = React.lazy(() => import('./pages/default/Checkout'));

const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'));
const PasswordResetPage = React.lazy(() => import('./pages/auth/PasswordResetPage'));

import { BrandIcon } from "./assets/svg";

import { motion } from "framer-motion";

// Importing CSS
import './App.css'
import { AnimatePresence } from "motion/react";
import { NotificationContext } from "./context/NotificationContext";

import { UserProfileInterface } from "./types/user.interface";
import { UserCredential } from "firebase/auth";

import { Suspense } from 'react';

const Loading = () => (
	<AnimatePresence>
		<motion.div
			initial={{ scale: 1 }}
			animate={{ scale: [1, 1.1, 1] }}
			transition={{ duration: 1, repeat: Infinity }}
			className='flex justify-center items-center h-screen w-screen'
		>
			<BrandIcon 
				width={80}
				height={80}
				bgFill='fill-primary dark:fill-secondary' 
				fgFill='fill-secondary dark:fill-primary' 
			/>
		</motion.div>
	</AnimatePresence>

);

const WithSuspense = ({ children }: { children: React.ReactNode }) => (
	<Suspense fallback={<Loading />}>
		{children}
	</Suspense>
);

const BrowserRouter = createBrowserRouter([
	{
		path: "/",
		element: <WithSuspense children={<Default/>} />,
		children: [
			{
				path: "",
				element: <WithSuspense children={<HomePage />} />,
			},
			{
				path: "shop",
				element: <WithSuspense children={<ShopPage />} />,
			},
			{
				path: "checkout",
				element: <WithSuspense children={<Checkout />} />,
			},
		]
	},
	{
		path: "auth",
		element: <WithSuspense children={<Auth />}/>,
		children: [
			{
				path: "login",
				element: <WithSuspense children={<LoginPage />} />,
			},
			{
				path: "signup",
				element: <WithSuspense children={<SignUpPage />} />,
			},
			{
				path: "password-reset",
				element: <WithSuspense children={<PasswordResetPage />} />,
			}
		]
	}
]);


function App() {

	const { setNotification } = useContext(NotificationContext)
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = AuthStateChanged((user : UserCredential['user']) => {
			if (user) {
				const userProfileData = 
					{ displayName: user.displayName, email: user.email } as UserProfileInterface
				console.log(userProfileData)
				const userProfile = createUserProfileDocumentOrGetProfile(user, userProfileData)

				Promise.all([userProfile]).then((data) => {
					const userProfileData = data[0]
					const pickedUserData = (user : UserCredential['user']) => {
						return {
							uid: user.uid,
							displayName: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
							phoneNumber: user.phoneNumber,
							emailVerified: user.emailVerified,
							...userProfileData,
						}
					}
					dispatch(setUser(pickedUserData(user)))
				}).catch((error) => {
					setNotification({
						message: 'Something went wrong',
						status: 'error'
					})
				})
				dispatch(setInitialCart(user) as any)
			}
		})
		dispatch(setInitialProductsAsync() as any)
		return () => unsubscribe()
	},[dispatch])

	return (
		<AnimatePresence mode="wait">
			<RouterProvider router={BrowserRouter} />
		</AnimatePresence>
	)
}

export default App


