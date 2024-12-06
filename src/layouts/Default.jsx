import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

import ThemeToggle from '../components/ThemeToggle'

const Default = () => {
  return (
    <>
        <ThemeToggle />
        <Navbar />
        <Outlet />
    </>
  )
}

export default Default