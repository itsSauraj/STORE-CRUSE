import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { BrandIcon } from '../assets/svg'

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import { motion, AnimatePresence } from 'framer-motion'

import PaperButton from './utilities/PaperButton'

import { NotificationContext } from '../context/NotificationContext'
import { LogOutUser } from '../utils/firebase/filrebase.utils'	 
import { logoutUser } from '../redux/slices/user.slice'

import { useSelector, useDispatch } from 'react-redux'

import DropDownCart from '../components/shop/DropDownCart'

import { BagIcon } from '../assets/svg'

const navLinks = [
	{
		title: 'Shop',
		to: '/shop'
	},
]

const Navbar = () => {


	const dispatch = useDispatch()
	const currentUser = useSelector(state => state.user.currentUser)

	const { setNotification } = useContext(NotificationContext)

	const [nav, setNav] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const handleNav = () => {
		setNav(!nav)
	}

	useEffect(() => {
		setNav(false)

		return () => {
			setNav
		}
	}, [location])

	const handleLogout = async () => {
		dispatch(logoutUser(null))
		dispatch({
			type: 'SET_USER',
			payload: null
		})
		await LogOutUser()
		setNotification({
			message: 'User Logged Out',
			status: 'success'
		})
		setNav(false)
	}

	const cartIconRef = useRef([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};


	return (
		<div className='relative'>
			<header className='flex px-6 py-3 items-center justify-between'>
				<Link to='/'>
					<BrandIcon width={50} height={50} bgFill='fill-primary dark:fill-secondary' fgFill='fill-secondary dark:fill-primary' />
				</Link>
				<nav className='hidden md:flex space-x-6 items-center'>
					{navLinks.map((link, index) => (
						<li key={index} className='decoraion-none list-none hover:underline transition-all duration-500'>
							<Link to={link.to} className='text-primary dark:text-secondary text-center px-2 py-1 uppercase'>
								{link.title}
							</Link>
						</li>
					))}
					{!currentUser ? (
						<PaperButton
							value='LOGIN'
							onClick={() => navigate('/auth/login')}
							className='bg-primary dark:bg-secondary px-2 py-1 text-secondary dark:text-primary'
						/>
					) : (
						<>
							<PaperButton
								value='LOGOUT'
								onClick={() => handleLogout()}
								className='bg-primary dark:bg-secondary px-2 py-1 text-secondary dark:text-primary'
							/>
							<BagIcon
								onClickHandler={() => toggleDropdown()}
								ref = {(el) => (cartIconRef.current[0] = el)}
								width={70} 
								height={40}
								strokeColor='stroke-primary dark:stroke-secondary'
								textColor='fill-primary dark:fill-secondary'
							/>
						</>
					)}
				</nav>
				
				<div className='flex gap-2 items-center md:hidden'>
					<BagIcon
						onClickHandler={() => toggleDropdown()}
						ref = {(el) => (cartIconRef.current[1] = el)}	
						width={25} 
						height={25}
						strokeColor='stroke-primary dark:stroke-secondary'
						textColor='fill-primary dark:fill-secondary'
					/>
					<motion.div
						onClick={handleNav}
						whileTap={{ scale: 0.9 }}
					>
						{nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
					</motion.div>
				</div>

				<AnimatePresence mode="wait">{nav && (
					<>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: nav ? 1 : 0, x: nav ? 0 : -20 }}
							exit={{ opacity: 0, x: -20 }}
							className={`z-50 fixed top-0 left-0 h-[100svh] flex flex-col justify-between items-center 
								bg-primary dark:bg-secondary text-secondary dark:text-primary
								shadow-md w-[70%] md:hidden ${nav ? 'block' : 'hidden'}`}
						>
							<ul className='flex flex-col items-center space-y-4 py-6 w-full text-secondary dark:text-primary'>
								{navLinks.map((link, index) => (
									<li key={index} className='decoraion-none list-none hover:underline transition-all duration-500'>
										<Link to={link.to} className='text-center px-2 py-1 uppercase'>
											{link.title}
										</Link>
									</li>
								))}
								{!currentUser ? (
									<PaperButton
										value='LOGIN'
										onClick={() => navigate('/auth/login')}
										className='border-secondary dark:border-primary px-2 py-1'
									/>
								) : (<>
									<PaperButton
										value='Logout'
										onClick={() => handleLogout()}
										className='border-secondary dark:border-primary px-2 py-1'
									/>
								</>
								)}
							</ul>
							<p className='font-sans text-[12px] dark:text-primary/80 text-secondary/80'>Cruse Cloting &copy; 2024</p>
						</motion.div>
					</>
				)}</AnimatePresence>
			</header>
			<AnimatePresence mode='wait'>
				<DropDownCart
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>	
			</AnimatePresence>
		</div>
	)
}

export default Navbar