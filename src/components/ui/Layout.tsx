import React, { lazy, Suspense } from 'react'
// import Header from '../Header'
const Header = lazy(() => import("../Header"))

import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Preloader from './Preloader'

type Props = {}

const Layout = (props: Props) => {
  return (
    <>
      <Header /> 
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout