import Logo from './ui/Logo'
import { Link, NavLink } from 'react-router-dom'
import CartIcon from './ui/CartIcon'
import UserAvatar from './ui/UserAvatar'
import Search from './Search'
import { useSelector } from 'react-redux'
import { useProduct } from '../store/slices/productSlice'
import { Status } from '../store/types'
import TextLoader from './ui/TextLoader'

const Header = () => {
  const { products, status } = useSelector(useProduct)

  return (
    <header className=' bg-white py-4'>
      <div className="container mx-auto  flex justify-between">
        <Logo />
        <div className="flex gap-x-6">
          {/* dynamically add active class */}
          <NavLink className={({ isActive }) => `${isActive ? 'font-bold' : ''} flex items-center hover:font-bold`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'font-bold' : ''} flex items-center hover:font-bold`} to="/collections">Collections</NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'font-bold' : ''} flex items-center hover:font-bold`} to="/contact">Contact</NavLink>
        </div>
        <div className="flex gap-x-6 items-center">
          {status === Status.PENDING ? <TextLoader col='1' cssClass='' /> : <Search data={products} />}

          <button>
            <CartIcon />
          </button>
          <div className='relative group'>
            <button>
              <UserAvatar />
            </button>
            <div className="absolute top-6 left-0 bg-white w-[60px] rounded shadow-md z-10 flex flex-col group-hover:visible invisible">
              <Link to='/login' className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header