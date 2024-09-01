import Logo from './ui/Logo'
import { NavLink } from 'react-router-dom'
import SearchIcon from './ui/SearchIcons'
import CartIcon from './ui/CartIcon'
import UserAvatar from './ui/UserAvatar'

const Header = () => {
  return (
    <header className=' bg-white py-4'>
      <div className="container mx-auto  flex justify-between">
        <Logo />
        <div className="flex gap-x-6">
          <NavLink className='flex items-center' to="/">Home</NavLink>
          <NavLink className='flex items-center' to="/collections">Products</NavLink>
          <NavLink className='flex items-center' to="/contact">Contact</NavLink>
        </div>
        <div className="flex gap-x-6">
          <div className='relative'>
            <SearchIcon />
            <input type='text' readOnly className='text-black py-2 px-4 rounded cursor-pointer border-slate-400 border-[1px] text-sm text-left outline-none pl-10' value={''} placeholder='Search products' />
          </div>
          <button>
            <CartIcon />
          </button>
          <button>
            <UserAvatar />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header