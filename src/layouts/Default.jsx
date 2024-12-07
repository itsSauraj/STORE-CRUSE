import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from '../components/Navbar'

import ThemeToggle from '../components/ThemeToggle'

import Transition from '../components/Transition'
import { useEffect, useState } from 'react'

const Default = () => {

  const location = useLocation()
  const [reload, setReload] = useState(false)
  
  useEffect(() => {
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 1000)
  }, [location])
  
  return (
    <>
        <ThemeToggle />
        <Navbar />
          { reload ? (
            <Transition component={<Outlet />} /> 
          ) : (
            <Outlet />
          )}
    </>
  )
}

export default Default