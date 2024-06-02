import { Route, BrowserRouter as Router, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"
import DashBoard from "./pages/admin/DashBoard"
import Products from "./pages/admin/Products"
import SignIn from "./pages/admin/SignIn"
import { Provider, useSelector } from "react-redux"
import { AdminStore } from "./store"
import PageNotFound from "./pages/admin/PageNotFound"
import Private from "./pages/admin/Private"
import AddProduct from "./components/ui/admin/AddProduct"
import EditProduct from "./components/ui/admin/EditProduct"
import Orders from "./pages/admin/Orders"
import Customers from "./pages/admin/Customers"
import Reviews from "./pages/admin/Reviews"

import PrivateRoute from "./pages/admin/Private"

function App() {
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: <PrivateRoute />,

      children: [{
        path: 'products',
        element: <Products />
      },
      {
        path: 'dashboard',
        element: <DashBoard />
      },
      
      {
        path: 'orders',
        element: <Orders />
      },
      
      {
        path: 'customers',
        element: <Customers />
      },
      
      {
        path: 'reviews',
        element: <Reviews />
      }
      ]
    },
    
    {
      path: 'login',
      element: <SignIn />
    },

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
