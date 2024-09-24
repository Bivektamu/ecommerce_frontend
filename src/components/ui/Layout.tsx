import  { lazy } from 'react'
const Header = lazy(() => import("../Header"))

import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useToasts } from '../../store/slices/toastSlice'
import ToastComponent from './Toast'

const Layout = () => {
  const allToasts = useSelector(useToasts)

  return (
    <>
      <Header />
      <main id="main">
        {
          allToasts?.length > 0 && <ToastComponent toasts={allToasts} />
        }
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout