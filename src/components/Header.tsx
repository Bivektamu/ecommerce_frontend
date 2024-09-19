import Logo from './ui/Logo'
import { Link, NavLink } from 'react-router-dom'
import gravatar from 'gravatar'

import CartIcon from './ui/CartIcon'
import UserAvatar from './ui/UserAvatar'
import Search from './Search'
import { useSelector } from 'react-redux'
import { useProduct } from '../store/slices/productSlice'
import { Status, User } from '../store/types'
import TextLoader from './ui/TextLoader'
import { getAuthStatus, logOut, useAuth } from '../store/slices/authSlice'
import { MouseEvent, useEffect, useState } from 'react'
import { useStoreDispatch } from '../store'
import { getCustomer, useCustomer } from '../store/slices/customerSlice'

const Header = () => {
  const { products, status } = useSelector(useProduct)
  const { isLoggedIn, userRole } = useSelector(useAuth)
  const { customer } = useSelector(useCustomer)

  const [gravatarUrl, setGravatarUrl] = useState('')

  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(getAuthStatus())
  }, [])

  useEffect(() => {
    if (userRole && userRole.userRole === User.CUSTOMER) {
      console.log(userRole);

      dispatch(getCustomer(userRole.id))

    }
  }, [userRole])


  useEffect(() => {
    if (customer) {
      const link = gravatar.url(customer.email, { s: '200', r: 'pg', d: 'mp' });
      setGravatarUrl(link)
    }

  }, [customer])

  const logOutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(logOut())
    setGravatarUrl('')
  }

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

          <Link to='/cart'>
            <CartIcon />
          </Link>
          <div className='relative group'>
            <button className='block'>
              {gravatarUrl ? <img className='w-7 h-7 rounded-full' src={gravatarUrl} /> : <UserAvatar />}

            </button>
            <div className="absolute top-6 left-0 bg-white w-[70px] rounded shadow-md z-10 flex flex-col group-hover:visible invisible">
              {
                isLoggedIn && userRole?.userRole !== User.ADMIN ?
                  <button onClick={logOutHandler} className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                    Log out
                  </button>
                  :
                  <>
                    <Link to='/login' className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                      Log in
                    </Link>

                    <Link to='/signup' className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                      Sign Up
                    </Link>
                  </>

              }


            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header