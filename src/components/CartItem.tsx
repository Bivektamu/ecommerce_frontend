import React, { ChangeEvent, ChangeEventHandler, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import { Cart, Colour, Product } from '../store/types'
import { useSelector } from 'react-redux'
import { getProducts, useProduct } from '../store/slices/productSlice'
import { useStoreDispatch } from '../store'
import SquareLoader from './ui/SquareLoader'
import TextLoader from './ui/TextLoader'
import Close from './ui/Close'
import getClasses from '../utils/getClasses'
import { deleteCart, updateCart } from '../store/slices/cartSlice'

type Props = {
    cartItem: Cart,
}

const CartItem = ({ cartItem }: Props) => {

    const dispatch = useStoreDispatch()
    const { products } = useSelector(useProduct)

    const [product, setProduct] = useState<Product | null>(null)
    const [quantity, setQuantity] = useState<number>(cartItem.quantity)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            setProduct(products.find(p => p.id === cartItem.productId))
        }
    }, [products])

    useEffect(() => {
        dispatch(updateCart({
            id: cartItem.id,
            quantity: quantity || 0
        }))

    }, [quantity])

    const rangeHandler = (e: MouseEvent<HTMLButtonElement>, type: string) => {
        e.stopPropagation()

        if (type === '-') {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
        }
        else {
            if (quantity < product?.quantity) {
                setQuantity(quantity + 1)
            }
        }
    }


    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.target.value);

        if (parseInt(e.target.value) > product?.quantity) {
            return
        }
        setQuantity(parseInt(e.target.value || '1'))
    }

    const deleteHandler = (e:MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteCart(cartItem.id))
    }

    return (
        <div key={cartItem.id} className="flex items-center justify-between gap-x-12 gap-y-8 mb-8">
            <div className="flex items-center gap-6">
                {!product ? <SquareLoader square={1} squareClass='min-w-16 min-h-16' />
                    :
                    <div className='bg-cultured'>
                        <img src={product.imgs[0]?.url} alt={product.title} className="w-16 h-16 object-contain" />
                    </div>
                }
                <div>
                    <h3 className="font-semibold mb-2">{product ? product.title : <TextLoader col='1' cssClass='w-[80px] h-4' />}</h3>
                    {!product ? <TextLoader col='1' cssClass='w-[80px] h-4' />
                        :
                        <p className='flex items-center text-xs gap-2'>Color: <span className={`w-4 h-4 rounded-full ${getClasses(cartItem.color as Colour).bgClass}`}></span> {cartItem.color} <span className="w-4 h-[2px] bg-slate-500"></span> Size: {cartItem.size}</p>
                    }
                </div>
            </div>

            <div className='flex items-center gap-4'>

                {!product ? <TextLoader col='1' cssClass='w-8 h-8' /> : <p className='font-semibold mr-4'>$ {cartItem.price}</p>}


                {
                    !product ? <TextLoader col='1' cssClass='w-24 h-8' /> :

                        <fieldset className=''>
                            <div className="flex items-center gap-2 w-min  justtify-start border-cultured border-[2px] rounded px-2 py-2">
                                <button type="button" className='w-4 h-4 relative' onClick={e => rangeHandler(e, '-')}>
                                    <span className='w-3 h-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                                </button>

                                <input type="number" name='quantity' value={quantity} onChange={changeHandler} className='w-[30px] text-center outline-none ' />

                                <button type="button" className='w-4 h-4 relative' onClick={e => rangeHandler(e, '+')}>
                                    <span className='w-3 h-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                                    <span className='h-3 w-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                                </button>
                            </div>
                        </fieldset>
                }
                <button className='w-10 h-10 bg-cultured' onClick={deleteHandler}>
                    <Close classN='bg-black w-4' />
                </button>

            </div>
        </div >
    )
}

export default CartItem