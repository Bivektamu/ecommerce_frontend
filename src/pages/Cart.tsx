import { useEffect, useState } from 'react'
import { useStoreDispatch } from '../store/index'
import { useAuth, getAuthStatus } from '../store/slices/authSlice'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import { useCart } from '../store/slices/cartSlice'
import { Cart } from '../store/types'
import CartItem from '../components/CartItem'

const Cart = () => {

  const dispatch = useStoreDispatch()
  const { userRole } = useSelector(useAuth)
  const { cart } = useSelector(useCart)

  const [cartState, setCartState] = useState<Cart[]>([])

  useEffect(() => {
    dispatch(getAuthStatus())
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


  return (
    <>
      <section id="breadcrums" className="">
        <div className="py-14 container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className='w-full bg-white flex justify-center items-center'>
        <div className="container pt-16 pb-24 px-8 flex">
          <div className="basis-2/3">
            <p className="font-bold text-xl pb-4 border-b-[1px] border-slate-200 mb-12">Your Cart</p>
            {
              cartState.length > 0 && cartState.map((cartItem: Cart) => (
                <CartItem cartItem={cartItem} />
              ))
            }

          </div>



        </div>
      </section>
    </>
  )
}

export default Cart