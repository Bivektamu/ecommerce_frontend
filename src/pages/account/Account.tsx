import { Outlet, useLocation, useNavigate } from "react-router-dom"
import BreadCrumbs from "../../components/ui/BreadCrumbs"
import PageWrapper from "../../components/ui/PageWrapper"
import SubNav from "./SubNav"
import { useEffect } from "react"
import { Role } from "../../store/types"
import { useSelector } from "react-redux"
import { useAuth } from "../../store/slices/authSlice"

const Account = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useSelector(useAuth)

  useEffect(() => {
    console.log(pathname);

    if (pathname === '/account' || pathname === '/account/') {
      navigate('/account/orders')
    }

  }, [pathname])


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }

    if (isLoggedIn && user && user.role !== Role.CUSTOMER) {
      navigate('/')
    }
  }, [user, isLoggedIn])

  return (
    <PageWrapper>
      <section id="breadcrums" className="bg-white">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-bold mb-4">My Account</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className='w-full bg-white  py-16'>
        <div className="container mx-auto flex gap-x-20">
          <div className='bg-white px-6 w-[250px] pt-24'>
            <SubNav />
          </div>
          <div className=" px-8 rounded-lg basis-2/3">
            <Outlet />
          </div>
        </div>
      </section>
    </PageWrapper >
  )
}

export default Account