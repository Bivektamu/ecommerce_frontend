import { MouseEvent, useState } from 'react'

import { Review, Toast, Toast_Vairant } from '../../store/types'
import getMonth from '../../utils/getMonth'
import { v4 as uuidv4 } from 'uuid';
import getExcerpt from '../../utils/getExcerpt';
import { GET_PRODUCT_AND_USER } from '../../data/query';
import { useQuery } from '@apollo/client';
import { useStoreDispatch } from '../../store';
import { addToast } from '../../store/slices/toastSlice';
import TileLoader from '../ui/TileLoader';

type Props = {
    review: Review,
    // reFetch: ()=> void
}

const ReviewTile = ({ review }: Props) => {
    const dispatch = useStoreDispatch()

    const { data, loading, error } = useQuery(GET_PRODUCT_AND_USER, {
        variables: {
            productId: review.productId,
            userId: review.userId
        }
    })



    const [actionId, setActionId] = useState('')


    const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    }

    if (error) {
        const newToast: Toast = {
            id: uuidv4(),
            variant: Toast_Vairant.INFO,
            msg: error.message
        }
        dispatch(addToast(newToast))
    }

    const product = data?.product
    const user = data?.user

    if (loading) {
        return <TileLoader cssClass='mb-8' />
    }

    return (
        <div className='grid grid-cols-table-reviews px-8 py-4 border-b-[1px] items-center   gap-x-8'>
            <img src={product?.imgs[0].url as string} className='rounded w-16 h-16' />
            <span className='text-sm text-slate-500 '>
                {user? user.firstName + ' ' + user.lastName : 'Inactive User'}
            </span>

            <span className='text-sm text-slate-500'>
                {review.review.length > 100 ? getExcerpt(review.review, 10) : review.review}
            </span>

            <span className='relative'>
                {review.rating} / 5
            </span>

            <span className='text-sm text-slate-500'>
                {getMonth((new Date(review.createdAt)).getMonth()) + ', ' + (new Date(review.createdAt)).getDate()}
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