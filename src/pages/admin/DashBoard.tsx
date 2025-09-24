// import Sidebar from '../../components/ui/Sidebar'
// import { Outlet } from 'react-router-dom'
import { FaDollarSign } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { IoPeople } from 'react-icons/io5'
import { GoAlertFill } from 'react-icons/go'
import SalesChart from '../../components/admin/dashboard/SalesChart'
import MobjePieChart from '../../components/admin/dashboard/MobjePieChart'
import RecentOrders from '../../components/admin/dashboard/RecentOrders'
import LowStockProducts from '../../components/admin/dashboard/LowStockProducts'

const DashBoard = () => {


  return (
    <section className="container mx-auto ">
      <div className="grid-cols-4 grid gap-6 mb-6">
        <div className='bg-white p-4 rounded-xl text-sm'>
          <p className="font-medium text-slate-600 flex justify-between mb-4 items-center">
            <span>Total Sales</span>
            <span className="bg-slate-500 p-2 rounded-lg text-white">
              <FaDollarSign />
            </span>
          </p>
          <p className="font-semibold text-xl mb-2">$ 128,450</p>
          <p className='text-slate-400 text-xs'>+12.5% vs last month</p>
        </div>

        <div className='bg-white p-4 rounded-xl text-sm'>
          <p className="font-medium text-slate-600 flex justify-between mb-4 items-center">
            <span>Total Orders</span>
            <span className="bg-slate-500 p-2 rounded-lg text-white">
              <FaShoppingCart />
            </span>
          </p>
          <p className="font-semibold text-xl mb-2">3,204</p>
          <p className='text-slate-400 text-xs'>+5.2% vs last month</p>
        </div>

        <div className='bg-white p-4 rounded-xl text-sm'>
          <p className="font-medium text-slate-600 flex justify-between mb-4 items-center">
            <span>Active Customer</span>
            <span className="bg-slate-500 p-2 rounded-lg text-white">
              <IoPeople />
            </span>
          </p>
          <p className="font-semibold text-xl mb-2">3,204</p>
          <p className='text-slate-400 text-xs'>+5.2% MoM</p>
        </div>

        <div className='bg-white p-4 rounded-xl text-sm'>
          <p className="font-medium text-slate-600 flex justify-between mb-4 items-center">
            <span>Low Stock Alerts</span>
            <span className="bg-slate-500 p-2 rounded-lg text-white">
              <GoAlertFill />
            </span>
          </p>
          <p className="font-semibold text-xl mb-2">14</p>
          <p className='text-slate-400 text-xs'>Check Inventory</p>
        </div>
      </div>

      <div className="grid-cols-7 grid gap-6 mb-6">
        <div className="col-span-4 bg-white rounded-xl">
          <p className="font-medium flex justify-between mb-4 items-center p-4 ">
            <span className='text-sm'>Sales Over Time</span>
            <span className="text-xs text-slate-400">
              Sales (AUD)
            </span>
          </p>
            <SalesChart />
        </div>

        <div className="col-span-3 bg-white rounded-xl">
          <p className="font-medium flex justify-between items-center p-4 ">
            <span className='text-sm'>Orders by category</span>
            <span className="text-xs text-slate-400">
              Orders
            </span>
          </p>
          <MobjePieChart />
        </div>
      </div>

      <div className="grid-cols-4 grid gap-6 mb-6">
        <div className='bg-white  rounded-xl text-sm col-span-3'>
          <RecentOrders />
        </div>

        <div className='bg-white  rounded-xl text-sm'>
          <LowStockProducts />
        </div>
      </div>

    </section>
  )
}

export default DashBoard