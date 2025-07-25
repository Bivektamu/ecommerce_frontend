import { FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Cart, ErrorCode, LoginInput, FormError, Role, Toast, Toast_Vairant, ValidateSchema } from '../store/types'
import { useStoreDispatch } from '../store/index'
import { useAuth, logInCustomer, getAuthStatus } from '../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import validateForm from '../utils/validate'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomNavLink from '../components/CustomNavLink'
import { upDateCart, useCart } from '../store/slices/cartSlice'
import PageWrapper from '../components/ui/PageWrapper'
import { addToast } from '../store/slices/toastSlice';

const LogIn = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const dispatch = useStoreDispatch()
  const { isLoggedIn, user, error } = useSelector(useAuth)
  const { cart } = useSelector(useCart)

  useEffect(()=> {
    dispatch(getAuthStatus())
  }, [])
  
  useEffect(() => {
    if (isLoggedIn && user?.role === Role.CUSTOMER)
      navigate('/')
  }, [isLoggedIn, user])

    useEffect(()=> {
    if(searchParams.get('cart')) {

       const cartItems = cart.map((item: Cart) => ({ ...item, customerId: item.userId || user?.id }))
      dispatch(upDateCart(cartItems))
      navigate('/checkout')
    }
  }, [searchParams])



  useEffect(() => {
    if (error && error?.code === ErrorCode.USER_NOT_FOUND) {
      const toast: Toast = {
        id: uuidv4(),
        variant: Toast_Vairant.WARNING,
        msg: error.msg as string
      }
      dispatch(addToast(toast))
    }
  }, [error])


  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<FormError>({} as FormError)


  // code to remove error info when fields are typed
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      Object.keys(formData).map(key => {
        if (formData[key as keyof typeof formData]) {
          setErrors(prev => ({ ...prev, [key]: '' }))
        }

      })
    }
  }, [formData])


  const { email, password } = formData


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()


    const validateSchema: ValidateSchema<unknown>[] =
      [
        {
          name: 'email',
          type: 'email',
          value: email
        },
        {
          name: 'password',
          type: 'string',
          value: password
        }
      ]


    const newErrors: typeof errors = validateForm(validateSchema)


    if (Object.keys(newErrors).length > 0) {
      return setErrors({ ...newErrors })
    }

    dispatch(logInCustomer(formData))

  }



  return (
    <PageWrapper>
      <section id="breadcrums" className="">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className='w-full bg-white flex justify-center items-center'>
        <div className="w-[384px] max-w-full bg-white pt-8 pb-12 px-8 rounded-lg">


          <form onSubmit={handleSubmit}>
            <fieldset className='mb-6'>
              <label htmlFor="email" className='font-medium block mb-1 text-mblack'>Email</label>
              <input type="text" id="email" name='email' value={email} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block w-full py-2 px-4 ' />
              {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
            </fieldset>

            <fieldset className='mb-6'>
              <label htmlFor="password" className='font-medium block w-full mb-1'>Password</label>
              <input type="password" id="password" name='password' value={password} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block w-full py-2 px-4' />
              {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
            </fieldset>
            <button type="submit" className='bg-black text-white py-2 px-4 rounded text-center cursor-pointer w-full'>Login</button>
          </form>
          <p className="text-sm mt-8 text-center text-slate-500">
            Don't have an account? <CustomNavLink to='/signup' cssClass='font-semibold'>Sign up</CustomNavLink>
          </p>
        </div>
      </section>
    </PageWrapper>
  )
}

export default LogIn