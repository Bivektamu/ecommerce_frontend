import Logo from './ui/Logo'
import { NavLink } from 'react-router-dom'
import CartIcon from './ui/CartIcon'
import UserAvatar from './ui/UserAvatar'
import Search from './Search'
import { useSelector } from 'react-redux'
import { useProduct } from '../store/slices/productSlice'
import { Status } from '../store/types'
import TextLoader from './ui/TextLoader'

const Header = () => {
  const {products, status} = useSelector(useProduct)

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
        <div className="flex gap-x-6">
          {status === Status.PENDING? <TextLoader col='1' cssClass='' />: <Search data={products} />}
          
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