import { Suspense, lazy, useEffect } from "react"
import { createBrowserRouter, useLocation } from "react-router-dom"

import Preloader from "./components/ui/Preloader"
import ProgressLoader from "./components/ui/ProgressLoader"

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

const Address = lazy(() => import("./pages/account/Address"))
const ChangePassword = lazy(() => import("./pages/account/ChangePassword"))
const AccountDetails = lazy(() => import("./pages/account/AccountDetails"))

const Fail = lazy(() => import("./pages/checkout/Fail"))
const Account = lazy(() => import("./pages/account/Account"))
const UserOrders = lazy(() => import("./pages/account/Orders"))
const UserOrderDetails = lazy(() => import("./pages/account/UserOrderDetails"))
const WishList = lazy(() => import("./pages/account/WishList"))

const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const Checkout = lazy(() => import("./pages/checkout/CheckOut"))
const Success = lazy(() => import("./pages/checkout/Success"))
const Home = lazy(() => import("./pages/Home"))
const Layout = lazy(() => import("./pages/Layout"))
const Product = lazy(() => import("./pages/Product"))
// const Contact = lazy(() => import("./pages/Contact"))
const Collections = lazy(() => import("./pages/Collections"))
const UnderWork = lazy(() => import("./pages/UnderWork"))
const LogIn = lazy(() => import("./pages/LogIn"))
const SignUp = lazy(() => import("./pages/SignUp"))

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={< Preloader />}>
            <ScrollToTop />
            <Layout />
        </Suspense >,
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
                element: <Suspense fallback={< Preloader />}>
                    <Product />
                </Suspense>
            },

            {
                path: '/contact',
                element: <Suspense fallback={< Preloader />}>
                    <UnderWork />
                </Suspense>
            },
            {
                path: '/cart',
                element: <Suspense fallback={< Preloader />}>
                    <Cart />
                </Suspense>
            },
            {
                path: '/checkout',
                children: [
                    {
                        path: 'success/:orderNumber',
                        element: <Suspense fallback={< Preloader />} >
                            <Success />
                        </Suspense>,
                    },
                    {
                        path: 'fail',
                        element: <Suspense fallback={< Preloader />} >
                            <Fail />
                        </Suspense>,
                    },
                    {
                        index: true,
                        element: <Suspense fallback={< Preloader />}>
                            <Checkout />
                        </Suspense>,
                    }
                ]

            },

            {
                path: '/account',
                element: <Suspense fallback={<Preloader />}>
                    <Account />
                </Suspense>,
                children: [
                    {
                        path: 'orders',
                        element: <Suspense fallback={< Preloader />} >
                            <UserOrders />
                        </Suspense>,
                    },
                    {
                        path: 'orders/:orderNumber',
                        element: <Suspense fallback={< Preloader />} >
                            <UserOrderDetails />
                        </Suspense>,
                    },
                    {
                        path: 'wishlist',
                        element: <Suspense fallback={< Preloader />} >
                            <WishList />
                        </Suspense>,
                    },
                    {
                        path: 'address',
                        element: <Suspense fallback={< Preloader />} >
                            <Address />
                        </Suspense>,
                    },
                    {
                        path: 'change-password',
                        element: <Suspense fallback={< Preloader />} >
                            <ChangePassword />
                        </Suspense>,
                    },
                    {
                        path: 'details',
                        element: <Suspense fallback={< Preloader />} >
                            <AccountDetails />
                        </Suspense>,
                    },

                ]
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
                            <Suspense fallback={< ProgressLoader />}>
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

export default router