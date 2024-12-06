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
      }
    ],
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



function App() {
  return (
    <RouterProvider router={BrowserRouter} />
  )
}

export default App


