import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { useStoreDispatch } from '../../store/index'
import { useAuth, getAuthStatus } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../../components/ui/BreadCrumbs'
import { deleteCartByCustomerId, useCart } from '../../store/slices/cartSlice'
import { Cart as CartType, CreateOrder, Order, Order_Status, OrderItem, Role, Status } from '../../store/types'
import SquareLoader from '../../components/ui/SquareLoader'
import { getProducts, useProduct } from '../../store/slices/productSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ShippingForm from '../../components/forms/ShippingForm'
import Preloader from '../../components/ui/Preloader'
import ProgressLoader from '../../components/ui/ProgressLoader'
import { useCustomer } from '../../store/slices/customerSlice'
import { useMutation } from '@apollo/client'
import { CREATE_ORDER } from '../../data/mutation'
import PageWrapper from '../../components/ui/PageWrapper'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER)

  const dispatch = useStoreDispatch()
  const { user, status: authStatus } = useSelector(useAuth)
  const { customer } = useSelector(useCustomer)

  const [preloaderFlag, setPreloaderFlag] = useState<boolean>(false)

  useEffect(() => {
    if (authStatus === Status.IDLE) {
      dispatch(getAuthStatus())
    }
    else if (authStatus !== Status.PENDING && user?.role !== Role.CUSTOMER) {
      navigate('/')
    }
  }, [authStatus])


  const newOrder: CreateOrder = useMemo(() => {
    if (location.state?.order) {
      const order = location.state.order
      order.items = order.items.map(({ id, customerId, ...rest }) => rest)
      if (customer && customer.address) {
        const { __typename, ...rest } = customer.address
        order.shippingAddress = rest
      }
      return order
    }
    else return {}
  }, [location, customer])

  const uniqueCartItems = useMemo(() => newOrder.items ? [...new Map(newOrder.items.map(item => [item.productId, item])).values()] : [], [newOrder.items])

  useEffect(() => {

    if (Object.keys(newOrder).length < 1 || newOrder.items.length < 1) {
      navigate('/')
    }
  }, [newOrder])


  const placeHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPreloaderFlag(true)
    console.log(newOrder)

    try {
      const { data } = await createOrder({
        variables: {
          input: newOrder
        }
      })

      dispatch(deleteCartByCustomerId(user?.id))
      navigate(`/checkout/success/${data.createOrder}`)

    } catch (error) {
      console.error("Error creating order", error);
      navigate('/checkout/fail')
    }
  }

  if (preloaderFlag || Object.keys(newOrder).length < 1)
    return <Preloader />


  return (
    <PageWrapper>
      {
        authStatus !== Status.FULFILLED && user?.role !== Role.CUSTOMER && <Preloader />
      }

      <section id="breadcrums" className="">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className='w-full bg-white flex justify-center items-center'>
        <div className="container pt-16 pb-36 flex gap-28">
          <div className="basis-2/3">
            <p className="font-bold text-xl  border-slate-200 mb-24">Shipping Address</p>

            <ShippingForm />

          </div>
          {/* border-slate-200 border-[1px] */}
          {
            Object.keys(newOrder).length < 1 ? <SquareLoader square={1} squareClass='basis-1/3 h-[400px]' /> : newOrder.total > 0 &&
              <div className="basis-1/3 border-slate-200 border-l-[1px]  pl-16 pr-0">
                <p className="font-bold text-xl mb-12">Order Summary</p>
                <div className="flex justify-between mb-12">
                  <div className='flex'>
                    {
                      uniqueCartItems.map((item, index) => <img key={index} className='w-8 mr-4' src={item.imgUrl} />)
                    }
                    {
                      uniqueCartItems.length < newOrder.items.length && <span className='self-center text-sm italic font-medium text-slate-600 '>+ {newOrder.items.length - uniqueCartItems.length}</span>
                    }

                  </div>
                  <Link to='/cart' className='text-sm  border-[1px] border-black w-28 justify-center flex items-center rounded'>Edit Cart</Link>
                </div>
                <p className="flex justify-between mb-4">
                  <span className=" text-gray-500 font-medium">Subtotal</span>
                  <span className='font-medium'>${newOrder.subTotal}</span>
                </p>
                <p className='flex justify-between mb-4'>
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className='font-medium'>Free</span>
                </p>
                <p className='flex justify-between pb-8 mb-8 border-b-[1px] border-gray-200'>
                  <span className="text-gray-500 font-medium">Tax</span>
                  <span className='font-medium'>${newOrder.tax}</span>
                </p>

                <p className='flex justify-between mb-10 border-gray-200'>
                  <span className="font-medium">Total</span>
                  <span className='font-medium'>${newOrder.total}</span>
                </p>

                <button className='bg-black text-white py-3 px-4 rounded text-center cursor-pointer text-sm w-full mb-8' onClick={placeHandler}>Place Order</button>
              </div>
          }

        </div>
      </section>
    </PageWrapper>
  )
}

export default Checkout