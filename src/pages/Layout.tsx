import { lazy } from 'react'
const Header = lazy(() => import("../components/Header"))

import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useToasts } from '../store/slices/toastSlice'
import ToastComponent from '../components/ui/Toast'
import { AnimatePresence } from 'framer-motion'
import Seo from '../components/Seo'

const Layout = () => {
  const allToasts = useToasts()

  const location = useLocation()

  if (location.pathname.includes("admin")) {
    return <Outlet />
  }

  return (
    <>

    <Seo
      description="Shop the latest fashion products online with ease. Browse collections, add to wishlist, and enjoy a seamless shopping experience with fast checkout."
        lang="eng-Au"
        title="Mobje Commerce | Shop Online, Add to Wishlist & Enjoy Seamless Checkout"
        author="Bivek Jang Gurung"
    />

      {
        allToasts?.length > 0 && <ToastComponent toasts={allToasts} />
      }

      <Header />
      <AnimatePresence mode="wait">

        <main id="main" key={location.pathname}>

          <Outlet />
        </main>
      </AnimatePresence >
      <Footer />
    </>


  )
}

export default Layout