import { NavLink } from 'react-router-dom'
import { FaRegHeart, FaRegUser } from 'react-icons/fa'
import { CiDeliveryTruck } from 'react-icons/ci'
import { RiKey2Line } from 'react-icons/ri'
import { BsCart4 } from 'react-icons/bs'

const SubNav = () => {
    return (
        <div className='bg-white px-6 pt-8 w-[250px] pt-20'>
            <nav className='flex flex-col gap-y-4'>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/orders"><BsCart4 className='w-5 h-5'  /> Orders</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/wishlist"><FaRegHeart className='w-4 h-4' /> Wishlist</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/address"><CiDeliveryTruck className='w-6 h-6' /> Address</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/password"><RiKey2Line className='w-5 h-5' />  Password</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/details"><FaRegUser className='w-4 h-4' /> Account Detail</NavLink>
            </nav>
        </div>
    )
}

export default SubNav