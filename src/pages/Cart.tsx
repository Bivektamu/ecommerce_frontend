import { useEffect, useState } from 'react'
import { useStoreDispatch } from '../store/index'
import { useAuth, getAuthStatus } from '../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import { useCart } from '../store/slices/cartSlice'
import { Cart, Status } from '../store/types'
import CartItem from '../components/CartItem'
import SquareLoader from '../components/ui/SquareLoader'
import { getProducts, useProduct } from '../store/slices/productSlice'

const Cart = () => {

  const dispatch = useStoreDispatch()
  const { userRole } = useSelector(useAuth)
  const { cart } = useSelector(useCart)
  const {status} = useSelector(useProduct)

  const [cartState, setCartState] = useState<Cart[]>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    dispatch(getAuthStatus())
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    let tempCart: CartItem[] = cart


    if (tempCart.length > 0 && userRole) {
      tempCart = [...tempCart.filter(cart => cart.customerId === userRole.id)]
    }

    if (tempCart.length > 0) {
      setCartState([...tempCart])
    }

  }, [cart, userRole])

  useEffect(() => {
    if (cartState.length > 0 && status !== Status.REJECTED) {
      let tempTotal = 0
      cartState.forEach((cart: Cart) => {
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
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className='w-full bg-white flex justify-center items-center'>
        <div className="container pt-16 pb-36 px-8 flex gap-28">
          <div className="basis-2/3">
            <p className="font-bold text-xl pb-4 border-b-[1px] border-slate-200 mb-12">Your Cart</p>
            {
              cartState.length < 1 ?
              <p className='text-sm'>
                Ther are no items in your cart. Please add items to your shopping cart.</p>
              : cartState.map((cartItem: Cart) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))
            }
          </div>

          {
            status !== Status.FULFILLED?<SquareLoader square={1} squareClass='basis-1/3 h-[400px]' />:total > 0  &&
            <div className="basis-1/3 border-slate-200 border-[1px] p-6">
              <p className="font-bold text-xl mb-12">Order Summary</p>
              <p className="flex justify-between">
                <span className="text-sm">Subtotal</span>
                <span>${total}</span>
              </p>

            </div>
          }

        </div>
      </section>
    </>
  )
}

export default Cart