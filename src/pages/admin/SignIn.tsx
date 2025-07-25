import { FormEvent, useEffect, useState } from 'react'
import { CreateUserForm, Status, Role } from '../../store/types'
import { useNavigate } from 'react-router-dom'
import { useStoreDispatch } from '../../store'
import { useAuth, loginAdmin, getAuthStatus } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'
import Preloader from '../../components/ui/Preloader'

const SignIn = () => {

  const dispatch = useStoreDispatch()
  const auth = useSelector(useAuth)
  const { isLoggedIn, status, user } = auth

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAuthStatus())

  }, [])

  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('password123')
  const [errors, setErrors] = useState<Partial<Pick<CreateUserForm, 'email' | 'password'>>>({})

  useEffect(() => {
    if (status === Status.FULFILLED && isLoggedIn && user?.role === Role.ADMIN) {
      navigate('/admin/dashboard')
    }
  }, [status, isLoggedIn, user])

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
    const data: Partial<Pick<CreateUserForm, 'email' | 'password'>> = {
      email,
      password
    }

    dispatch(loginAdmin(data))
  }

  // if (status === Status.PENDING || isLoggedIn || user) {
  //   return <Preloader />
  // }

  if (status === Status.PENDING) {
    return <Preloader />
  }



  return (
    <section className='w-full h-screen flex justify-center items-center'>
      <div className="w-[384px] max-w-full bg-white pt-8 pb-12 px-8 rounded-lg">
        <svg id="logo" className='mx-auto mb-16' width="116" height="40" viewBox="0 0 116 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1524_896)">
            <path d="M20.4768 11.3486L14.2039 7.5551C13.6118 7.19293 12.9387 7.00151 12.2531 7.00032C10.2093 7.00032 8.33463 8.71226 8.33463 11.105V25.3073L20.4768 17.9669C22.9081 16.4947 22.9081 12.82 20.4768 11.3486ZM11.8483 18.448V10.8679L18.1162 14.6567L11.8483 18.448Z" fill="#0E1422" />
            <path d="M23.8488 32.9845C23.8488 33.0273 11.9907 32.966 11.9907 32.966L10.9432 32.8426C9.2466 32.644 7.94413 31.1233 8.00185 29.3346C8.00185 29.2918 8.00553 29.2519 8.00799 29.2103C8.05459 28.4365 8.32595 27.6961 8.7857 27.0885C8.9724 26.8461 9.20079 26.6426 9.45903 26.4883L18.478 21.0725C20.3413 19.9535 21.893 19.562 22.6998 17.5341C22.9973 16.7757 23.1258 15.9562 23.0756 15.1379L23.0444 14.5866L23.965 19.9205C24.0829 20.8264 23.9012 21.7537 23.421 22.5169C23.1325 22.9785 22.7474 23.3653 22.295 23.6479L11.8294 28.8943C11.819 28.9006 11.8088 28.9075 11.7991 28.9149C11.5126 29.1293 11.6894 29.6069 12.0402 29.5867L20.7514 29.6403C22.4431 29.5417 23.8524 31.2112 23.8488 32.9845Z" fill="#0E1422" />
          </g>
          <path d="M36.3998 28L40.7998 13.6H44.8598L49.2598 28H46.4598L42.5398 15.3H43.0598L39.1998 28H36.3998ZM39.0398 25V22.46H46.6398V25H39.0398ZM54.4321 28.3C53.4388 28.3 52.5688 28.05 51.8221 27.55C51.0755 27.05 50.4921 26.37 50.0721 25.51C49.6588 24.65 49.4521 23.68 49.4521 22.6C49.4521 21.5 49.6621 20.5233 50.0821 19.67C50.5088 18.81 51.1055 18.1333 51.8721 17.64C52.6388 17.1467 53.5388 16.9 54.5721 16.9C55.5988 16.9 56.4621 17.15 57.1621 17.65C57.8621 18.15 58.3921 18.83 58.7521 19.69C59.1121 20.55 59.2921 21.52 59.2921 22.6C59.2921 23.68 59.1088 24.65 58.7421 25.51C58.3821 26.37 57.8421 27.05 57.1221 27.55C56.4021 28.05 55.5055 28.3 54.4321 28.3ZM54.8721 25.88C55.4788 25.88 55.9621 25.7433 56.3221 25.47C56.6888 25.1967 56.9521 24.8133 57.1121 24.32C57.2721 23.8267 57.3521 23.2533 57.3521 22.6C57.3521 21.9467 57.2721 21.3733 57.1121 20.88C56.9521 20.3867 56.6955 20.0033 56.3421 19.73C55.9955 19.4567 55.5388 19.32 54.9721 19.32C54.3655 19.32 53.8655 19.47 53.4721 19.77C53.0855 20.0633 52.7988 20.46 52.6121 20.96C52.4255 21.4533 52.3321 22 52.3321 22.6C52.3321 23.2067 52.4221 23.76 52.6021 24.26C52.7821 24.7533 53.0588 25.1467 53.4321 25.44C53.8055 25.7333 54.2855 25.88 54.8721 25.88ZM57.3521 28V20.6H57.0121V13.6H59.7521V28H57.3521ZM74.5521 28V21.62C74.5521 20.9067 74.3821 20.3533 74.0421 19.96C73.7088 19.56 73.2455 19.36 72.6521 19.36C72.2721 19.36 71.9421 19.45 71.6621 19.63C71.3821 19.8033 71.1621 20.05 71.0021 20.37C70.8488 20.6833 70.7721 21.0467 70.7721 21.46L69.6321 20.7C69.6321 19.96 69.8055 19.3067 70.1521 18.74C70.5055 18.1733 70.9755 17.7333 71.5621 17.42C72.1555 17.1 72.8121 16.94 73.5321 16.94C74.7655 16.94 75.6955 17.3067 76.3221 18.04C76.9555 18.7667 77.2721 19.72 77.2721 20.9V28H74.5521ZM61.5321 28V17.2H63.9321V20.78H64.2721V28H61.5321ZM68.0521 28V21.62C68.0521 20.9067 67.8821 20.3533 67.5421 19.96C67.2088 19.56 66.7455 19.36 66.1521 19.36C65.5855 19.36 65.1288 19.5567 64.7821 19.95C64.4421 20.3367 64.2721 20.84 64.2721 21.46L63.1321 20.66C63.1321 19.9533 63.3088 19.32 63.6621 18.76C64.0155 18.2 64.4888 17.7567 65.0821 17.43C65.6821 17.1033 66.3521 16.94 67.0921 16.94C67.9388 16.94 68.6321 17.12 69.1721 17.48C69.7188 17.84 70.1221 18.32 70.3821 18.92C70.6421 19.52 70.7721 20.18 70.7721 20.9V28H68.0521ZM79.0725 15.7V13.3H81.7925V15.7H79.0725ZM79.0725 28V17.2H81.7925V28H79.0725ZM91.1504 28V22.9C91.1504 22.6533 91.1371 22.34 91.1104 21.96C91.0838 21.5733 91.0004 21.1867 90.8604 20.8C90.7204 20.4133 90.4904 20.09 90.1704 19.83C89.8571 19.57 89.4104 19.44 88.8304 19.44C88.5971 19.44 88.3471 19.4767 88.0804 19.55C87.8138 19.6233 87.5638 19.7667 87.3304 19.98C87.0971 20.1867 86.9038 20.4933 86.7504 20.9C86.6038 21.3067 86.5304 21.8467 86.5304 22.52L84.9704 21.78C84.9704 20.9267 85.1438 20.1267 85.4904 19.38C85.8371 18.6333 86.3571 18.03 87.0504 17.57C87.7504 17.11 88.6304 16.88 89.6904 16.88C90.5371 16.88 91.2271 17.0233 91.7604 17.31C92.2938 17.5967 92.7071 17.96 93.0004 18.4C93.3004 18.84 93.5138 19.3 93.6404 19.78C93.7671 20.2533 93.8438 20.6867 93.8704 21.08C93.8971 21.4733 93.9104 21.76 93.9104 21.94V28H91.1504ZM83.7704 28V17.2H86.1904V20.78H86.5304V28H83.7704Z" fill="#0E1422" />
          <defs>
            <clipPath id="clip0_1524_896">
              <rect width="15.9998" height="29.9994" fill="white" transform="translate(8 5.00032)" />
            </clipPath>
          </defs>
        </svg>

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
  )
}

export default SignIn