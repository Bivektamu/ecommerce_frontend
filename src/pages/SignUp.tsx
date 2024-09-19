import { FormEvent, useEffect, useState } from 'react'
import { Action, FormData, Status, Toast, Toast_Vairant, User } from '../store/types'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { useStoreDispatch } from '../store'
import { useAuth, getAuthStatus } from '../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import { ValidateSchema } from '../store/types'
import validateForm from '../utils/validate'
import { createCustomer, useCustomer } from '../store/slices/customerSlice'
import { addToast } from '../store/slices/toastSlice';

const SignUp = () => {

  const navigate = useNavigate()

  const dispatch = useStoreDispatch()
  const auth = useSelector(useAuth)
  const { isLoggedIn, status, userRole } = auth

  const { customer, status: customerStatus, error: customerError,  action} = useSelector(useCustomer)


  useEffect(() => {
    dispatch(getAuthStatus())
  }, [])

  useEffect(() => {
    if (customer && action === Action.ADD) {
      const newToast: Toast = {
        id: uuidv4(),
        variant: Toast_Vairant.SUCCESS,
        msg: 'Your account has been created succesfully. Please login now.'
      }
      dispatch(addToast(newToast))

      return navigate('/login')

    }
  }, [customer])

  useEffect(() => {
    if (customerError) {
      console.log(customerError);

      const newToast: Toast = {
        id: uuidv4(),
        variant: Toast_Vairant.DANGER,
        msg: customerError
      }
      dispatch(addToast(newToast))
    }
  }, [customerError])

  const [formData, setFormData] = useState<FormData>({
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'Test@123'
  })
  const [errors, setErrors] = useState<FormData>({})


  // code to remove error info when fields are typed
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      Object.keys(formData).map(key => {
        if (formData[key]) {
          setErrors(prev => ({ ...prev, [key]: '' }))
        }

      })
    }
  }, [formData])


  const { firstName, lastName, email, password } = formData


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()


    const validateSchema: ValidateSchema<any>[] =
      [
        {
          name: 'firstName',
          type: 'text',
          value: firstName,
          msg: 'Please insert first name.'
        },
        {
          name: 'lastName',
          type: 'text',
          value: lastName,
          msg: 'Please insert last name.'
        },
        {
          name: 'email',
          type: 'email',
          value: email
        },
        {
          name: 'password',
          type: 'password',
          value: password
        }
      ]


    const newErrors: typeof errors = validateForm(validateSchema)

    if (Object.keys(newErrors).length > 0) {
      return setErrors({ ...newErrors })
    }

    dispatch(createCustomer(formData))

  }

  if ( isLoggedIn && userRole?.userRole === User.CUSTOMER) {
    return <Navigate to="/" />
  }

  return (
    <>
      <section id="breadcrums" className="">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className='w-full bg-white flex justify-center items-center py-32'>
        <div className="w-[384px] max-w-full bg-white  px-8 rounded-lg">

          <form onSubmit={handleSubmit}>
            <fieldset className='mb-6'>
              <label htmlFor="firstName" className='font-medium block mb-1 text-slate-600 text-sm'>First name</label>
              <input type="text" id="firstName" name='firstName' value={firstName} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4 ' />
              {errors.firstName && <span className='text-xs text-red-500'>{errors.firstName}</span>}
            </fieldset>

            <fieldset className='mb-6'>
              <label htmlFor="lastName" className='font-medium block mb-1 text-slate-600 text-sm'>Last name</label>
              <input type="text" name='lastName' id="lastName" value={lastName} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4 ' />
              {errors.lastName && <span className='text-xs text-red-500'>{errors.lastName}</span>}
            </fieldset>

            <fieldset className='mb-6'>
              <label htmlFor="email" className='font-medium block mb-1 text-slate-600 text-sm'>Email</label>
              <input type="text" id="email" name='email' value={email} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4 ' />
              {errors.email && <span className='text-xs text-red-500'>{errors.email}</span>}
            </fieldset>

            <fieldset className='mb-6'>
              <label htmlFor="password" className='font-medium block w-full mb-1 text-sm text-slate-600'>Password</label>
              <input type="password" id="password" name='password' value={password} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4' />
              {errors.password && <span className='text-xs text-red-500'>{errors.password}</span>}
            </fieldset>

            <p className="text-xs mb-8 font-medium text-slate-500">
              By creating an account you agree with our Terms of Service, Privacy Policy,
            </p>
            <button type="submit" className='bg-black text-white py-2 px-4 rounded text-center text-sm cursor-pointer w-full'>Create Account</button>
          </form>
          <p className="text-sm mt-8 text-center text-slate-500">
            Already have an account? <Link to='/login' className='font-semibold'>Log in</Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default SignUp