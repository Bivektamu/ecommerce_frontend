import React from 'react'
import Sidebar from '../../components/ui/Sidebar'
import { Outlet } from 'react-router-dom'
import UnderWork from '../UnderWork'

type Props = {}

const DashBoard = (props: Props) => {
  return (
    // <section className="w-full pl-[340px] pb-12 pr-12">
    //   DashBoard</section>
    <UnderWork />
  )
}

export default DashBoard