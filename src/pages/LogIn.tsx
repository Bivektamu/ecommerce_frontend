import { FormEvent, useEffect, useState } from 'react'
import { FormData, Status } from '../../store/types'
import { Navigate } from 'react-router-dom'
import { useStoreDispatch } from '../../store'
import { useAuth, loginAdmin, getAuthStatus } from '../../store/slices/adminAuth'
import { useSelector } from 'react-redux'
import Logo from '../../components/ui/AdminLogo'
import Preloader from '../../components/ui/Preloader'
import BreadCrumbs from '../components/ui/BreadCrumbs'

const LogIn = () => {

  // const dispatch = useStoreDispatch()
  // const auth = useSelector(useAuth)
  // const { isLoggedIn, status } = auth

  // useEffect(() => {
  //   dispatch(getAuthStatus())
  // }, [])

  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('password123')
  const [errors, setErrors] = useState<Partial<Pick<FormData, 'email' | 'password'>>>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const newErrors: typeof errors = {}

    if (email === '') {
      newErrors.email = 'Please insert your email'
    }

    if (password === '') {
      newErrors.password = 'Please insert your password'
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors({ ...newErrors })
    }
    const data: Partial<Pick<FormData, 'email' | 'password'>> = {
      email,
      password
    }

    // dispatch(loginAdmin(data))

  }

  // if (status == Status.IDLE || status === Status.PENDING) {
  //   return <Preloader />
  // }

  // if (status === Status.FULFILLED && isLoggedIn) {
  //   return <Navigate to="/admin" />
  // }

  return (
    <>
    <section id="breadcrums" className="">
        <div className="py-8 container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>
      
      <section className='w-full bg-white flex justify-center items-center'>
        <div className="w-[384px] max-w-full bg-white pt-8 pb-12 px-8 rounded-lg">
        

          <form onSubmit={handleSubmit}>
            <fieldset className='mb-6'>
              <label htmlFor="email" className='font-medium block mb-1 text-mblack'>Email</label>
              <input type="text" id="email" readOnly value={email} onChange={e => setEmail(e.target.value)} className='border-[1px] border-slate-300 rounded-md block w-full py-2 px-4 ' />
              {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
            </fieldset>

            <fieldset className='mb-6'>
              <label htmlFor="password" className='font-medium block w-full mb-1'>Password</label>
              <input type="password" id="password" readOnly value={password} onChange={e => setPassword(e.target.value)} className='border-[1px] border-slate-300 rounded-md block w-full py-2 px-4' />
              {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
            </fieldset>
            <button type="submit" className='bg-black text-white py-2 px-4 rounded text-center cursor-pointer w-full'>Login</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default LogIn