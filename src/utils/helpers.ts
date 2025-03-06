import { Review } from "../store/types"

export const getAverageRating = (reviews: Review[]) => {
    return Number((reviews.reduce((sum, review) => review.rating as number + sum, 0) / reviews.length).toFixed(1))
}