import { Outlet } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

const Auth = () => {
  return (
    <>
      <ThemeToggle />
      <Outlet />
    </>

  )
}

export default Auth