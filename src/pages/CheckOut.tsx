import { useEffect, useState } from 'react'
import { useStoreDispatch } from '../store/index'
import { useAuth, getAuthStatus } from '../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import { useCart } from '../store/slices/cartSlice'
import { Cart as CartType, Status } from '../store/types'
import SquareLoader from '../components/ui/SquareLoader'
import { getProducts, useProduct } from '../store/slices/productSlice'
import { Link } from 'react-router-dom'
import ShippingForm from '../components/forms/ShippingForm'

const Checkout = () => {

  const dispatch = useStoreDispatch()
  const { user } = useSelector(useAuth)
  const { cart:carts } = useSelector(useCart)
  const { status } = useSelector(useProduct)

  const [cartState, setCartState] = useState<CartType[]>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    dispatch(getAuthStatus())
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    let tempCart: CartType[] = carts

    if (tempCart.length > 0 && user) {
      tempCart = [...tempCart.filter(cart => cart.customerId === user.id)]
    }
    
    if(!user) {
      tempCart = [...tempCart.filter(cart=>!cart.customerId)]
    }

    setCartState([...tempCart])

  }, [carts, user])

  useEffect(() => {
    if (cartState.length > 0 && status !== Status.REJECTED) {
      let tempTotal = 0
      cartState.forEach((cart: CartType) => {
        tempTotal += cart.price as number * cart.quantity
      })
      setTotal(tempTotal)
    }
    else {
      setTotal(0)
    }

  }, [cartState, status])


  return (
    <>
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
            status !== Status.FULFILLED ? <SquareLoader square={1} squareClass='basis-1/3 h-[400px]' /> : total > 0 &&
              <div className="basis-1/3 border-slate-200 border-l-[1px]  pl-16 pr-0">
                <p className="font-bold text-xl mb-12">Order Summary</p>
                <p className="flex justify-between mb-4">
                  <span className=" text-gray-500 font-medium">Subtotal</span>
                  <span className='font-medium'>${total}</span>
                </p>
                <p className='flex justify-between mb-4'>
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className='font-medium'>Free</span>
                </p>
                <p className='flex justify-between pb-8 mb-8 border-b-[1px] border-gray-200'>
                  <span className="text-gray-500 font-medium">Tax</span>
                  <span className='font-medium'>${total / 10}</span>
                </p>

                <p className='flex justify-between mb-10 border-gray-200'>
                  <span className="font-medium">Total</span>
                  <span className='font-medium'>${total + total / 10}</span>
                </p>

                <button className='bg-black text-white py-3 px-4 rounded text-center cursor-pointer text-sm w-full mb-8'>Checkout</button>
                <div className='block text-center'>
                <Link to='/collections' className='text-sm font-semibold border-b-[1px] border-black'>Continue Shopping</Link>
                </div>

              </div>
          }

        </div>
      </section>
    </>
  )
}

export default Checkout