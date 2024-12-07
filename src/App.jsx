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
      }
    ]
  }
]);



// function App() {
//   return (
//     <AnimatePresence mode="wait">
//       <RouterProvider router={BrowserRouter} />
//     </AnimatePresence>
//   )
// }

import { Route, Routes, useLocation } from 'react-router-dom'

function App() {

  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Default />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App


