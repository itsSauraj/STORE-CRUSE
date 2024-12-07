import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import ThemeToggle from '../components/ThemeToggle'

import Transition from '../components/Transition'

const Auth = () => {
  
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
      { reload ? (
        <Transition component={<Outlet />} /> 
      ) : (
        <Outlet />
      )}
    </>

  )
}

export default Auth