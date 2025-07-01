import { Suspense, lazy } from "react"

import { RouterProvider, createBrowserRouter } from "react-router-dom"
const DashBoard = lazy(() => import("./pages/admin/DashBoard"))
const Products = lazy(() => import("./pages/admin/Products"))
const SignIn = lazy(() => import("./pages/admin/SignIn"))
const AddProduct = lazy(() => import("./components/admin/AddProduct"))
const EditProduct = lazy(() => import("./components/admin/EditProduct"))
const Orders = lazy(() => import("./pages/admin/Orders"))
const Customers = lazy(() => import("./pages/admin/Customers"))
const Reviews = lazy(() => import("./pages/admin/Reviews"))
const PrivateRoute = lazy(() => import("./pages/admin/Private"))

const Cart = lazy(() => import("./pages/Cart"))

import Preloader from "./components/ui/Preloader"
import ProgressLoader from "./components/ui/ProgressLoader"
import PageNotFound from "./pages/admin/PageNotFound"
import Checkout from "./pages/CheckOut"
import OrderStatus from "./pages/OrderStatus"
const Home = lazy(() => import("./pages/Home"))
const Layout = lazy(() => import("./components/ui/Layout"))
const Product = lazy(() => import("./pages/Product"))
// const Contact = lazy(() => import("./pages/Contact"))
const Collections = lazy(() => import("./pages/Collections"))
const UnderWork = lazy(() => import("./pages/UnderWork"))
const LogIn = lazy(() => import("./pages/LogIn"))
const SignUp = lazy(() => import("./pages/SignUp"))

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Suspense fallback={<Preloader />}><Layout /></Suspense>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/collections',
          element: <Collections />
        },
        {
          path: '/collections/:slug',
          element: <Suspense fallback={<Preloader />}>
            <Product />
          </Suspense>
        },

        {
          path: '/contact',
          element: <Suspense fallback={<Preloader />}>
            <UnderWork />
          </Suspense>
        },
        {
          path: '/cart',
          element: <Suspense fallback={<Preloader />}>
            <Cart />
          </Suspense>
        },
        {
          path: '/checkout',
          element: <Suspense fallback={<Preloader />}>
            <Checkout />
          </Suspense>
        },
        
        {
          path: '/order/:id/status',
          element: <Suspense fallback={<Preloader />}>
            <OrderStatus />
          </Suspense>
        },
        {
          path: '/login',
          element: <Suspense fallback={<Preloader />}>
            <LogIn />
          </Suspense>
        },
        {
          path: '/signup',
          element: <Suspense fallback={<Preloader />}>
            <SignUp />
          </Suspense>
        },
        {
          path: '/admin/login',
          element: <Suspense fallback={<Preloader />}>
            <SignIn />
          </Suspense>
        },
        {
          path: '/admin',
          element: <Suspense fallback={<Preloader />}>
            <PrivateRoute />
          </Suspense>,

          children: [
            {
              path: 'products',
              element:
                <Suspense fallback={<ProgressLoader />}>
                  <Products />
                </Suspense>
              ,
            },
            {
              path: 'products/:slug',
              element: <Suspense fallback={<ProgressLoader />}>
                <EditProduct />
              </Suspense>,
            },

            {
              path: 'products/add',
              element: <Suspense fallback={<ProgressLoader />}>
                <AddProduct />
              </Suspense>,
            },
            {
              path: 'dashboard',
              element: <Suspense fallback={<ProgressLoader />}>
                <DashBoard />
              </Suspense>
            },

            {
              path: 'orders',
              element: <Orders />
            },

            {
              path: 'customers',
              element: <Suspense fallback={<ProgressLoader />}>
                <Customers />
              </Suspense>
            },

            {
              path: 'reviews',
              element: <Suspense fallback={<ProgressLoader />}>
                <Reviews />
              </Suspense>
            }
          ]
        },

        {
          path: '*',
          element: <Suspense fallback={<Preloader />}>
            <PageNotFound />
          </Suspense>,

        },

      ]
    },






  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
