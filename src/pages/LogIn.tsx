import { FormEvent, useEffect, useState } from 'react'
import { FormData, Status, ValidateSchema } from '../store/types'
import { useStoreDispatch } from '../store/index'
import { useAuth, getAuthStatus, logInCustomer } from '../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import validateForm from '../utils/validate'
import { Navigate } from 'react-router-dom'

const LogIn = () => {

  const dispatch = useStoreDispatch()
  const { isLoggedIn, status, userRole } = useSelector(useAuth)

  useEffect(() => {
    dispatch(getAuthStatus())
  }, [])

  useEffect(()=>{
    console.log(isLoggedIn);
  }, [isLoggedIn])

  const [formData, setFormData] = useState<Pick<FormData, 'email'|'password'>>({
    email: 'test@test.com',
    password: 'Test@123'
  })
  const [errors, setErrors] = useState<Pick<FormData, 'email'|'password'>>({} as typeof errors)

  
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


  const {email, password} = formData


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    
    const validateSchema: ValidateSchema<any>[] =
      [
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
    
    console.log(formData);
    

    dispatch(logInCustomer(formData))

  }

  // if (status == Status.IDLE || status === Status.PENDING) {
  //   return <Preloader />
  // }

  if (status === Status.FULFILLED && isLoggedIn) {
    return <Navigate to="/" />
  }

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
              <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} className='border-[1px] border-slate-300 rounded-md block w-full py-2 px-4 ' />
              {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
            </fieldset>

            <fieldset className='mb-6'>
              <label htmlFor="password" className='font-medium block w-full mb-1'>Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className='border-[1px] border-slate-300 rounded-md block w-full py-2 px-4' />
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