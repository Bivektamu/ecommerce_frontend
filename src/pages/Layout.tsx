import { lazy } from 'react'
const Header = lazy(() => import("../components/Header"))

import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useToasts } from '../store/slices/toastSlice'
import ToastComponent from '../components/ui/Toast'
import { AnimatePresence } from 'framer-motion'

const Layout = () => {
  const allToasts = useSelector(useToasts)

  const location = useLocation()

  if (location.pathname.includes("admin")) {
    return <Outlet />
  }

  return (
    <>

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