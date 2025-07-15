import { useEffect, useState } from 'react'
import { Customer, Order, Product, Colour } from '../../store/types'
import getMonth from '../../utils/getMonth'
import data from '../../data'
import gravatar from 'gravatar'
import Tooltip from '../ui/Tooltip'
type Props = {
    order: Order
}


const OrderDetails = ({ order }: Props) => {
    const [gravatarUrl, setGravatarUrl] = useState('')
    const [customer, setCustomer] = useState<Customer>()
    const [orderedProducts, setOrderedProducts] = useState<Product[]>([])


    const { customers, products } = data


    useEffect(() => {
        const customerExists = customers.filter(cs => cs.id === order.userId)[0]
        if (customerExists) {
            setCustomer({ ...customerExists })
            setGravatarUrl(gravatar.url(customerExists.email, { s: '200', r: 'pg', d: '404' }))
        }
    }, [order.userId])


    useEffect(() => {
        console.log(order.items);

        if (order.items.length > 0) {
            const productArray: Product[] = []
            order.items.map(pr => {
                const productExists = products.find(item => item.id === pr.productId)

                if (productExists) {
                    productExists.colors = [pr.color]
                    productExists.sizes = [pr.size]
                    productExists.quantity = pr.quantity
                    productArray.push(productExists)
                }
            }
            )
            setOrderedProducts([...productArray])
        }

    }, [order.items])

    useEffect(() => {
        if (orderedProducts.length > 0) {
            console.log(orderedProducts);
        }
    }, [orderedProducts])


    return (
        <section className='text-left'>
            <p className="font-medium text-slate-900 mb-6 pb-2 border-b-[1px] text-lg">Order Detail</p>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-500">Ordered on:</span>
                {
                    order?.orderPlaced && <span className="text-sm font-medium">{getMonth(order.orderPlaced.getMonth()) + ', ' + order.orderPlaced.getDay()}</span>
                }

            </div>xxx

            <div className="flex items-center justify-between ">
                <span className="text-sm font-medium text-slate-500">Status:</span>
                <span className="text-sm font-medium capitalize">{order.status}</span>
            </div>

            <p className="font-medium text-slate-900 mt-10 mb-6 pb-2 border-b-[1px] text-lg">Customer</p>
            <div className="flex items-center gap-4 mb-6">
                <img src={gravatarUrl} alt="" className='w-14 h-14 rounded' />
                <div className=''>
                    <span className=" font-medium">{customer?.firstName + ' ' + customer?.lastName}</span>
                    <br />
                    <span className="text-xs text-slate-500 font-medium">{customer?.email}</span>
                </div>
            </div>

            <p className="font-medium text-slate-900 mt-10 mb-6 pb-2 border-b-[1px] text-lg">Ordered Items</p>
            {
                orderedProducts.map(item =>
                    <div key={item.id} className="flex items-center gap-4 mb-6">
                        <img src={item.imgs[0].url as string} alt="" className='w-14 h-14' />
                        <div className='grow'>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.title}</span>
                                <div className='flex items-center gap-2'>
                                    <span className={`w-3 h-3 rounded-full relative group bg-${item.colors[0].toLowerCase()}${item.colors[0] === Colour.BLACK ? '' : '-600'} block`}>
                                        <Tooltip title='color' />
                                    </span>
                                    <span className='w-3 h-[1px] bg-black text-sm'></span>
                                    <span className='text-xs relative group'>
                                        {item.sizes[0]}
                                        <Tooltip title='size' />
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className="text-xs text-slate-500 font-medium">$ {item.price}</span>
                                <span className='w-3 h-[1px] bg-black text-sm'></span>
                                <span className='text-xs relative group'>Quantity: {item.quantity}
                                </span>
                            </div>


                        </div>
                    </div>

                )
            }

            <div className='border-t-[1px] pt-4  w-full flex justify-between'>
                <span className="text-sm text-slate-500 font-medium">Total</span>
                <span className="text-sm text-slate-800 font-medium">$ {order.total}</span>
            </div>



        </section>
    )
}

export default OrderDetails