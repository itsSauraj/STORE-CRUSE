import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { BrandIcon } from '../assets/svg'

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    {
        title: 'Shop',
        to: '/shop'
    },
    {
        title: 'About',
        to: '/about'
    },
    {
        title: 'help',
        to: '/help'
    }
]

const Navbar = () => {
        const [nav, setNav] = useState(false)
        const location = useLocation()

        const handleNav = () => {
                setNav(!nav)
        }

        useEffect(() => {
                setNav(false)
        }, [location])

        return (
                <header className='flex px-6 py-3 items-center justify-between'>
                        <Link to='/'>
                                <BrandIcon width={50} height={50} bgFill='fill-primary dark:fill-secondary' fgFill='fill-secondary dark:fill-primary'/>
                        </Link>
                        <nav className='hidden md:flex space-x-6 items-center'>
                                {navLinks.map((link, index) => (
                                        <li key={index} className='decoraion-none list-none hover:underline transition-all duration-500'>
                                                <Link to={link.to} className='text-primary dark:text-secondary text-center px-2 py-1'>
                                                        {link.title}
                                                </Link>
                                        </li>
                                ))}
                                <Link to="auth/login" className='bg-primary dark:bg-secondary px-2 py-1 text-secondary dark:text-primary text-center hover:opacity-85'>Login</Link>
                        </nav>

                        <motion.div 
                                onClick={handleNav} 
                                className='block md:hidden'
                                whileTap={{ scale: 0.9 }}
                        >
                                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                        </motion.div>

                        <AnimatePresence mode="wait">{nav && (
                                <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: nav ? 1 : 0, x: nav ? 0 : -20 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className={`absolute top-0 left-0 h-full bg-white shadow-md w-[70%] md:hidden ${nav ? 'block' : 'hidden'}`}
                                >
                                        <ul className='flex flex-col items-center space-y-4 py-6'>
                                                {navLinks.map((link, index) => (
                                                        <li key={index} className='decoraion-none list-none hover:underline transition-all duration-500'>
                                                                <Link to={link.to} className='text-primary text-center px-2 py-1'>
                                                                        {link.title}
                                                                </Link>
                                                        </li>
                                                ))}
                                                <Link to="auth/login" className='bg-primary px-2 py-1 text-secondary text-center hover:opacity-85'>Login</Link>
                                        </ul>
                                </motion.div>
                        )}</AnimatePresence>
                </header>
        )
}

export default Navbar