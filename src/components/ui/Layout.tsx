import React, { lazy, Suspense } from 'react'
// import Header from '../Header'
const Header = lazy(() => import("../Header"))

import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Preloader from './Preloader'
import { useSelector } from 'react-redux'
import { toasts } from '../../store/slices/toastSlice'
import ToastComponent from './Toast'

type Props = {}

const Layout = (props: Props) => {
  const allToasts = useSelector(toasts)

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