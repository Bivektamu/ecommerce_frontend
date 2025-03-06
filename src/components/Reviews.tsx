import { useSelector } from 'react-redux'
import StarIcon from './ui/StarIcon'
import { userReviews } from '../store/slices/reviewSlice'
import { useAuth } from '../store/slices/authSlice'
import { Action, User } from '../store/types'
import { MouseEvent, ReactElement, useEffect, useState } from 'react'
import Modal from './ui/Modal'
import AddReviewForm from './forms/AddReviewForm'
import { getAverageRating } from '../utils/helpers'

type  Props = {
    productId: string
}
const Reviews = ({productId}: Props) => {

    const { reviews, action } = useSelector(userReviews)
    const { user } = useSelector(useAuth)

    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState<ReactElement | null>(null)

     useEffect(() => { 
            if (modalContent) {
                setShowModal(true)
            }
        }, [modalContent])
    
    
        useEffect(()=> {
            if(action === Action.ADD) {
                setShowModal(false)
        setModalContent(null)
                setModalContent(null)
            }
        }, [action])


    const createReviewHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setModalContent(<AddReviewForm productId={productId} />)
    }

    const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowModal(false)
        setModalContent(null)
    }


    return (
        <div id='reviews-tab'>
            <p className="font-semibold mb-4">Reviews</p>

            <div className='flex gap-4 items-center mb-10'>
                {reviews.length > 0 ?
                    <>
                        <h2 className="text-3xl font-bold">{getAverageRating(reviews)}</h2><span className="w-4 h-[2px] bg-slate-400"></span> <p className='text-slate-500 text-xs'>{reviews.length} Reviews</p>
                    </>
                    :
                    <p className="">There are no reviews for this product</p>
                }

            </div>
            {
                user?.userRole === User.CUSTOMER && <button onClick={createReviewHandler} className="border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm font-medium mb-2">Write a review</button>
            }

            {
                reviews.length > 0 &&
                <>
                    <div className='border-cultured border-b-[1px] py-4 flex justify-end mb-16'>
                        <p className="text-xs text-slate-600 uppercase font-semibold tracking-wider flex gap-2 items-center">sort by <span className="w-2 h-2 border-b-2 border-r-2 rotate-45 border-slate-600 -translate-y-[2px]"></span></p>
                    </div>

                    <div className="wrapper pb-8">
                        {new Array(3).fill('*').map((_, i) =>

                            <div key={i} className="flex items-start justify-between mb-12 gap-10">
                                <div className="flex items-start justify-between gap-4">

                                    <div className="basis-1/12">
                                        <span className="bg-slate-200 w-10 h-10 rounded-full block"></span>
                                    </div>

                                    <div className='basis-11/12'>
                                        <p className="mb-2">Emily Davis</p>
                                        <p className="mb-4 text-slate-600 uppercase text-sm">1 week ago</p>
                                        <p className="text-slate-600  text-sm">
                                            This company always goes above and beyond to satisfy their customers.
                                        </p>
                                    </div>

                                </div>
                                <div className='flex gap-1'>
                                    {new Array(5).fill('*').map((_, i) =>
                                        <StarIcon key={i} />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm font-medium text-slate-600 mx-auto block">Load more reviews</button>
                </>
            }

            {
                showModal && <Modal close={closeModal}>
                    {modalContent!}
                </Modal>
            }
        </div>
    )
}

export default Reviews