// import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { stripTypename } from '@apollo/client/utilities'
import ReviewTile from '../../components/admin/ReviewTile'
import SearchIcon from '../../components/ui/SearchIcons'
import { GET_REVIEWS } from '../../data/query'
import { useStoreDispatch } from '../../store'
import { Review, Toast, Toast_Vairant } from '../../store/types'
import { useQuery } from '@apollo/client'
import { addToast } from '../../store/slices/toastSlice';
import ProgressLoader from '../../components/ui/ProgressLoader';

const Reviews = () => {

    const dispatch = useStoreDispatch()

    const { data, loading, error, refetch } = useQuery(GET_REVIEWS)

    if (error) {
        const newToast: Toast = {
            id: uuidv4(),
            variant: Toast_Vairant.DANGER,
            msg: error.message
        }
        dispatch(addToast(newToast))
    }

    const reviews:Review[]  = data?.reviews? stripTypename(data.reviews): [];
    console.log(reviews)
    if (loading)
         return <ProgressLoader />
    return (

        <div className='bg-white rounded-lg'>
            <div className="flex justify-between p-8 items-center">
                <p className="font-semibold">Reviews</p>
                <div className='relative'>
                    <SearchIcon />
                    <input type='text' className='text-black py-2 px-4 rounded cursor-pointer border-slate-400 border-[1px] text-sm text-left outline-none pl-10' value={''} placeholder='Search reviews' />
                </div>
            </div>

            <div className='grid grid-cols-table-reviews gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] mb-6'>
                <button>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 3.3087L3.37549 1.00035M3.37549 1.00035L5.75246 3.30726M3.37549 1.00035L3.37935 13M13 10.692L10.6238 12.9997M10.6238 12.9997L8.24754 10.692M10.6238 12.9997V1" stroke="#474B57" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <span className='text-sm text-slate-500 font-medium '>
                    Name
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Review
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Rating
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Submitted at
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Action
                </span>
            </div>

            {
                reviews.length < 1 ?
                    <p className='px-8 py-8 text-slate-500'>There are no reviews yet.</p>
                    :
                    <div className="w-full">
                        {
                            reviews.map(review =>
                                <ReviewTile key={review.id} review={review} refetchReview={refetch}  />
                            )
                        }
                    </div>

            }


        </div>
    )
}

export default Reviews