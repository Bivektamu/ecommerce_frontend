import Logo from './ui/Logo'
import gravatar from 'gravatar'

import CartIcon from './ui/CartIcon'
import UserAvatar from './ui/UserAvatar'
import Search from './Search'
import { useSelector } from 'react-redux'
import { useProduct } from '../store/slices/productSlice'
import { Role } from '../store/types'
import { getAuthStatus, logOut, useAuth } from '../store/slices/authSlice'
import { MouseEvent, useEffect, useState } from 'react'
import { useStoreDispatch } from '../store'
import { getCustomer, useCustomer } from '../store/slices/customerSlice'
import CustomNavLink from './CustomNavLink'

const Header = () => {
  const { products } = useSelector(useProduct)
  const { isLoggedIn, user } = useSelector(useAuth)
  const { customer } = useSelector(useCustomer)

  const [gravatarUrl, setGravatarUrl] = useState('')

  const dispatch = useStoreDispatch()

  useEffect(() => {
    dispatch(getAuthStatus())
  }, [])

  useEffect(() => {
    if (user && user.role === Role.CUSTOMER) {
      dispatch(getCustomer(user.id))

    }
  }, [user])


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
          <CustomNavLink isNavLink={true} cssClass='flex items-center hover:font-bold' to="/">Home</CustomNavLink>
          <CustomNavLink isNavLink={true} cssClass='flex items-center hover:font-bold' to="/collections">Collections</CustomNavLink>
          <CustomNavLink isNavLink={true} cssClass='flex items-center hover:font-bold' to="/contact">Contact</CustomNavLink>
        </div>
        <div className="flex gap-x-6 items-center">
          <Search data={products} />

          <CustomNavLink to='/cart'>
            <CartIcon />
          </CustomNavLink>
          <div className='relative group'>
            <button className='block'>
              {gravatarUrl ? <img className='w-7 h-7 rounded-full' src={gravatarUrl} /> : <UserAvatar />}

            </button>
            <div className="absolute top-6 left-0 bg-white w-[70px] rounded shadow-md z-10 flex flex-col group-hover:visible invisible">
              {
                isLoggedIn && user?.role !== Role.ADMIN ?
                  <button onClick={logOutHandler} className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                    Log out
                  </button>
                  :
                  <>
                    <CustomNavLink to='/login' cssClass='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                      Log in
                    </CustomNavLink>

                    <CustomNavLink to='/signup' cssClass='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between'   >
                      Sign Up
                    </CustomNavLink>
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