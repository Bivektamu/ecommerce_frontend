import { MouseEvent, useEffect, useState } from 'react'

import { Customer, Product, Review} from '../../store/types'
import getMonth from '../../utils/getMonth'
import { useDispatch } from 'react-redux';
import data from '../../data';
import getExcerpt from '../../utils/getExcerpt';

type Props = {
    review: Review
}

const ReviewTile = ({ review }: Props) => {
    const dispatch = useDispatch()
    const [actionId, setActionId] = useState('')
    const [product, setProduct] = useState<Product | null>(null)
    const [customer, setCustomer] = useState<Customer | null>(null)

    const {customerId, productId} = review

    const {products, customers} = data
    useEffect(()=> {
        const productExists:Product |  null = products.filter(item=>item.id === productId)[0]
        if(productExists) {
            setProduct(productExists)
        }
    }, [productId])

    useEffect(()=> {
        const customerExists:Customer | null = customers.filter(item=>item.id === customerId)[0]
        if(customerExists) {
            setCustomer(customerExists)
        }
    }, [customerId])

    const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(review.id);
    }

    return (
        <div className='grid grid-cols-table-reviews px-8 py-4 border-b-[1px] items-center   gap-x-8'>
            <img src={product?.imgs[0].img as string} className='rounded w-16 h-16' />
            <span className='text-sm text-slate-500 '>
                {customer?.firstName + ' ' + customer?.lastName}
            </span>

            <span className='text-sm text-slate-500'>
                {review.text.length > 100? getExcerpt(review.text, 10):review.text}
            </span>

            <span className='relative'>
                {review.rating} / 5
            </span> 

            <span className='text-sm text-slate-500'>
                {getMonth(review.timeStamp.getMonth()) + ', ' + review.timeStamp.getDate()}
            </span>

            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
                <button onClick={() => setActionId('id1')} >...</button>
                {actionId === 'id1' &&
                    <div className='absolute  bg-white border-[1px] rounded-lg shadow w-[140px] top-full right-full translate-x-8 -translate-y-3 after:content-[""] after:w-7 after:h-7  after:absolute after:z-10 after:-right-5 after:-top-4' onMouseLeave={() => setActionId('')}>
                        <button onClick={e => deleteHandler(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>Delete</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default ReviewTile