import { NavLink } from 'react-router-dom'
import CartIcon from '../../components/ui/CartIcon'

const SubNav = () => {
    return (
        <section className='w-[280px] bg-white px-6 pt-8'>
            <nav className='flex flex-col gap-y-4'>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/orders"><CartIcon /> Orders</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/wishlist">Wishlist</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/address">Address</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/password">Password</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'font-semibold' : '') + ` text-sm pt-2 flex gap-x-4 items-center`} to="/account/details">Account Detail</NavLink>
            </nav>
        </section>
    )
}

export default SubNav