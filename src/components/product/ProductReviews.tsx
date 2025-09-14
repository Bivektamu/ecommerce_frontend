import { MouseEvent, ReactElement, useEffect, useMemo, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import StarIcon from '../ui/StarIcon'
import { useAuth } from '../../store/slices/authSlice'
import { Action, Review, Role } from '../../store/types'

import Modal from '../ui/Modal'
import AddReviewForm from '../forms/AddReviewForm'
import { getAverageRating } from '../../utils/helpers'
import AvatarPlaceholder from '../ui/AvatarPlaceholder'
import UserName from '../ui/UserName'
import { useQuery } from '@apollo/client'
import { GET_REVIEWS_BY_PRODUCT_ID } from '../../data/query'
import { useReviews } from '../../store/slices/reviewSlice'

type Props = {
    productId: string
}
const ProductReviews = ({ productId }: Props) => {

    const { authUser } = useAuth()
    const { action } = useReviews()

    const REVIEWS_PER_PAGE = 3

    const { data, refetch } = useQuery(GET_REVIEWS_BY_PRODUCT_ID, {
        variables: {
            productReviewsId: productId
        }
    })

    const reviews = useMemo(() => {
        if (data && data?.productReviews) {
            return (data.productReviews)
        }
        return []
    }, [data])

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        reviewsPerPage: reviews
    })

    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState<ReactElement | null>(null)

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            setPagination(prev => ({
                ...prev,
                lastPage: Math.ceil(reviews.length / REVIEWS_PER_PAGE),
                reviewsPerPage: reviews.slice(0, REVIEWS_PER_PAGE)
            }))
        }
    }, [reviews])

    useEffect(() => {
        if (modalContent) {
            setShowModal(true)
        }
    }, [modalContent])


    useEffect(() => {
        if (action === Action.ADD) {
            setShowModal(false)
            setModalContent(null)
            setModalContent(null)
        }
    }, [action])



    const { reviewsPerPage, currentPage, lastPage } = pagination


    useEffect(() => {
        if (currentPage < lastPage) {
            setPagination(prev =>
            ({
                ...prev,
                reviewsPerPage: reviews.slice(0, REVIEWS_PER_PAGE * currentPage)
            })
            )

        }
        else if (currentPage === lastPage) {
            setPagination(prev =>
            ({
                ...prev,
                reviewsPerPage: reviews,
            })
            )
        }
    }, [currentPage])




    const handlePagination = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        setPagination(prev => ({
            ...prev,
            currentPage: prev.currentPage + 1
        }))

    }


    const createReviewHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setModalContent(<AddReviewForm productId={productId} refetchReviews = {refetch} />)
    }


    return (
        <div id='reviews-tab'>
            <p className="font-semibold mb-4">Reviews</p>

            <div className='flex gap-4 items-center mb-10'>
                {reviews && reviews.length > 0 ?
                    <>
                        <h2 className="text-3xl font-bold">{getAverageRating(reviews)}</h2><span className="w-4 h-[2px] bg-slate-400"></span> <p className='text-slate-500 text-xs'>{reviews.length} Reviews</p>
                    </>
                    :
                    <p className="">There are no reviews for this product</p>
                }

            </div>
            {
                authUser?.role === Role.CUSTOMER && <button onClick={createReviewHandler} className="border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm font-medium mb-2">Write a review</button>
            }

            {
                reviews && reviews.length > 0 &&
                <>
                    <div className='border-cultured border-b-[1px] py-4 flex justify-end mb-16'>
                        <p className="text-xs text-slate-600 uppercase font-semibold tracking-wider flex gap-2 items-center">sort by <span className="w-2 h-2 border-b-2 border-r-2 rotate-45 border-slate-600 -translate-y-[2px]"></span></p>
                    </div>

                    <div className="wrapper pb-8">
                        {reviewsPerPage.map((review: Review, i: string) =>

                            <div key={i} className="flex items-start justify-between mb-12 gap-10">
                                <div className="flex items-start justify-between gap-4 w-full">

                                    <div className="basis-1/12">
                                        <AvatarPlaceholder />
                                    </div>

                                    <div className='basis-11/12'>
                                        <div className="mb-2 capitalize">
                                            <UserName id={review.userId} />
                                        </div>
                                        <p className="mb-4 text-slate-600 uppercase text-sm">{formatDistanceToNow(review.createdAt, { addSuffix: true })}</p>
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
                        )}
                    </div>
                    <button
                        disabled={currentPage === lastPage && true}
                        onClick={handlePagination}
                        className={`border-[1px]  py-2 px-4 rounded text-center  text-sm font-medium text-slate-600 mx-auto block ${currentPage === lastPage ? 'cursor-not-allowed text-slate-200 border-slate-300' : 'cursor-pointer border-slate-600'}`}>Load more reviews</button>
                </>
            }

            {
                <Modal isOpen={showModal} close={() => setShowModal(false)} >
                    {modalContent!}
                </Modal>
            }
        </div>
    )
}

export default ProductReviews