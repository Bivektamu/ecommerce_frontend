import  { useState } from 'react'
import { Product } from '../store/types'
import StarIcon from './ui/StarIcon'
import ParagraphLoader from './ui/ParagraphLoader'
import Reviews from './Reviews'

type Props = {
    product: Product | null
}

const DetailsReviewsTab = ({ product }: Props) => {
    const [isReview, setIsReview] = useState(false)

    return (

        <div className='flex gap-8  mb-32'>
            <div className="basis-1/4 mt-12">
                <button className={`text-sm flex items-center w-full py-2 px-4 rounded gap-2 mb-2  font-semibold ${!isReview?'bg-cultured':'text-slate-600'} `} onClick={() => setIsReview(false)}>
                    <span className='relative bottom-1'>...</span> Details
                </button>
                <button className={`text-sm flex items-center w-full py-2 px-4 rounded gap-2  font-medium ${isReview?'bg-cultured':'text-slate-600'}`} onClick={() => setIsReview(true)}><StarIcon /> Reviews</button>
            </div>

            <div className="basis-3/4">

                {
                    !isReview ?
                        <div id="details-tab">
                            <p className="font-semibold mb-6">Details</p>
                            {
                                !product ? <ParagraphLoader col='1' /> :
                                    <p className="text-sm text-slate-600">{product?.description}</p>
                            }

                        </div>
                        :
                        <Reviews productId={product?.id as string} />
                }

            </div>
        </div>
    )
}

export default DetailsReviewsTab