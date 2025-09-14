import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../store/slices/authSlice'
import { Review, Role } from '../../store/types'

import Modal from '../ui/Modal'
import AddReviewForm from '../forms/AddReviewForm'
import { getAverageRating } from '../../utils/helpers'
import { useQuery } from '@apollo/client'
import { GET_REVIEWS_BY_PRODUCT_ID } from '../../data/query'
import ProgressLoader from '../ui/ProgressLoader'
import { stripTypename } from '@apollo/client/utilities'
import ReviewTile from './ReviewTile'

type Props = {
    productId: string
}
const ProductReviews = ({ productId }: Props) => {

    const { authUser } = useAuth()

    const REVIEWS_PER_PAGE = 3

    const { data, loading, error, refetch } = useQuery(GET_REVIEWS_BY_PRODUCT_ID, {
        variables: {
            productReviewsId: productId
        }
    })

    const reviews = useMemo(() => {
        if (data && data?.productReviews) {
            const reviews = stripTypename(data.productReviews).sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime())
            console.log()

            return (reviews)
        }
        return []
    }, [data])

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        reviewsPerPage: reviews
    })

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            setPagination(prev => ({
                ...prev,
                lastPage: Math.ceil(reviews.length / REVIEWS_PER_PAGE),
                reviewsPerPage: reviews.slice(0, REVIEWS_PER_PAGE)
            }))
        }
    }, [reviews])


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

    if (loading) {
        return <ProgressLoader />
    }


    if (error) {
        return <p>Sorry, there was a problem loading reviews. Please refresh the page again.</p>
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
                authUser?.role === Role.CUSTOMER && <button onClick={() => setShowModal(true)} className="border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm font-medium mb-2">Write a review</button>
            }

            {
                reviews && reviews.length > 0 &&
                <>
                    <div className='border-cultured border-b-[1px] py-4 flex justify-end mb-16'>
                        <p className="text-xs text-slate-600 uppercase font-semibold tracking-wider flex gap-2 items-center">sort by <span className="w-2 h-2 border-b-2 border-r-2 rotate-45 border-slate-600 -translate-y-[2px]"></span></p>
                    </div>

                    <div className="wrapper pb-8">
                        {reviewsPerPage.map((review: Review) =>
                            <ReviewTile key={review.id} review={review} refetchReview={refetch} />
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
                    <AddReviewForm productId={productId} refetchReviews={refetch} closeModal={() => setShowModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default ProductReviews