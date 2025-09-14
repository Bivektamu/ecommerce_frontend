import React from 'react'
import { Review } from '../../store/types'

import { formatDistanceToNow } from 'date-fns'
import StarIcon from '../ui/StarIcon'

import AvatarPlaceholder from '../ui/AvatarPlaceholder'
import UserName from '../ui/UserName'


type Props = {
    review: Review
}

const ReviewTile = ({review}:Props) => {
    return (
        <div  className="flex items-start justify-between mb-6 gap-10 border-b pb-6">
            <div className="flex items-start justify-between gap-4 w-full">

                <div className="basis-1/12">
                    <AvatarPlaceholder />
                </div>

                <div className='basis-11/12'>
                    <div className="mb-2 capitalize">
                        <UserName id={review.userId} />
                    </div>
                    <p className="mb-4 text-slate-600 uppercase text-xs">{formatDistanceToNow(review.createdAt, { addSuffix: true })}</p>
                    <p className="text-slate-600  text-sm">
                        {review.review}
                    </p>
                </div>

            </div>
            <div className='flex gap-1'>
                {new Array(review.rating as number).fill('*').map((_, i) =>
                    <StarIcon key={i} />
                )}
            </div>
        </div>
    )
}

export default ReviewTile