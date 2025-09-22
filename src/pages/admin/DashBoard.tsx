// import Sidebar from '../../components/ui/Sidebar'
// import { Outlet } from 'react-router-dom'
import { FaDollarSign } from 'react-icons/fa'
import UnderWork from '../UnderWork'
import { FaShoppingCart } from 'react-icons/fa'
import { IoPeople } from 'react-icons/io5'
import { GoAlertFill } from 'react-icons/go'
import useAvatar from '../../components/hooks/useAvatar'

const DashBoard = () => {
  const { setAvatarEmail, avatar } = useAvatar()


  return (
    // <section className="w-full pl-[340px] pb-12 pr-12">
    //   DashBoard</section>
    // <UnderWork />
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
        </div>

        <div className="col-span-3 bg-white rounded-xl">
          <p className="font-medium flex justify-between mb-4 items-center p-4 ">
            <span className='text-sm'>Best Selling</span>
            <span className="text-xs text-slate-400">
              Sales (AUD)
            </span>
          </p>
        </div>
      </div>

      <div className="grid-cols-4 grid gap-6 mb-6">
        <div className='bg-white  rounded-xl text-sm col-span-3'>
          <p className="font-semibold p-4 text-slate-600 flex justify-between items-center">
            <span>Recent Orders</span>
            <button className="bg-cultured p-2 text-xs rounded-full px-4">
              View All
            </button>
          </p>

          <div className="grid grid-cols-7 gap-x-4 p-4 border-t-[1px] border-b-[1px]">
            <span className='text-xs text-slate-500 font-medium '>
              Order Number
            </span>
            <span className='text-xs text-slate-500 font-medium '>
              Items
            </span>
            <span className='text-xs text-slate-500 font-medium col-span-2'>
              Customer
            </span>
            <span className='text-xs text-slate-500 font-medium'>
              Status
            </span>
            <span className='text-xs text-slate-500 font-medium'>
              Total
            </span>
            <span className='text-xs text-slate-500 font-medium'>
              Date
            </span>
          </div>

          {
            (new Array(4)).fill('*').map(item =>
              <div className="grid grid-cols-7 px-4 py-2 border-b-[1px] items-center gap-x-4">
                <span className="text-xs text-slate-500 ">1752715553834</span>
                <span className="text-xs text-slate-500 capitalize">4</span>

                <div className="text-xs text-slate-500 col-span-2 flex items-center gap-2">
                  {avatar}
                  <span>
                    Bivek Gurung
                  </span>
                </div>
                <span className="text-xs text-slate-500 capitalize">processing</span>
                <span className="text-xs text-slate-500">$ 71.5</span>
                <span className="text-xs text-slate-500">17 June 2025</span>
              </div>

            )
          }



     
        </div>


      </div>

    </section>
  )
}

export default DashBoard