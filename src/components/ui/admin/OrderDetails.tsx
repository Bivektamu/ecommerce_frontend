import React, { useEffect, useState } from 'react'
import { Customer, Order, Product, OrderedProduct, Colour } from '../../../store/types'
import getMonth from '../../../utils/getMonth'
import data from '../../../data'
import gravatar from 'gravatar'

type Props = {
    order: Order
}


const OrderDetails = ({ order }: Props) => {
    const [gravatarUrl, setGravatarUrl] = useState('')
    const [customer, setCustomer] = useState<Customer>()
    const [orderedProducts, setOrderedProducts] = useState<Product[]>([])


    const { customers, products } = data


    useEffect(() => {
        const customerExists = customers.filter(cs => cs.id === order.customerId)[0]
        if (customerExists) {
            setCustomer({ ...customerExists })
            setGravatarUrl(gravatar.url(customerExists.email, { s: '200', r: 'pg', d: '404' }))
        }
    }, [order.customerId])


    useEffect(() => {
        console.log(order.products);

        if (order.products.length > 0) {
            const productArray: Product[] = []
            order.products.map(pr => {
                const productExists = products.find(item => item.id === pr.productId)

                if (productExists) {
                    productExists.colors = [pr.color]
                    productExists.sizes = [pr.size]
                    productArray.push(productExists)
                }
            }
            )
            setOrderedProducts([...productArray])
        }
        const customerExists = customers.filter(cs => cs.id === order.customerId)[0]
        if (customerExists) {
            setCustomer({ ...customerExists })
            setGravatarUrl(gravatar.url(customerExists.email, { s: '200', r: 'pg', d: '404' }))
        }
    }, [order.products])

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
                <span className="text-sm font-medium">{getMonth(order.timeStamp.getMonth()) + ', ' + order.timeStamp.getDay()}</span>
            </div>

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
                        <img src={item.imgs[0].img as string} alt="" className='w-14 h-14' />
                        <div className='grow'>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.title}</span>
                                <div className='flex items-center gap-2'>
                                    <span className={`w-3 h-3 rounded-full relative bg-${item.colors[0].toLowerCase()}${item.colors[0] === Colour.BLACK ? '' : '-600'} block`}></span>
                                    <span className='w-3 h-[1px] bg-black text-sm'></span>
                                    <span className='text-xs'>{item.sizes[0]}</span>
                                </div>
                            </div>
                            <br />
                            <span className="text-xs text-slate-500 font-medium">{customer?.email}</span>
                        </div>
                    </div>

                )
            }

        </section>
    )
}

export default OrderDetails