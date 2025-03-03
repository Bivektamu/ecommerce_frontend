import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReviewSlice, RootState, Status } from "../types";
import client from "../../data/client";
import { GET_REVIEWS_BY_PRODUCT_ID } from "../../data/query";

const initialState: ReviewSlice = {
    reviews: []
}

export const getReviewsByProductId = createAsyncThunk('/admin/reviews/productId', async (id: string) => {
    try {
        const res = await client.query({
            query: GET_REVIEWS_BY_PRODUCT_ID,
            variables: {reviewsByProductIdId: id}
        })

        return res.data.reviewsByProductId

    } catch (error) {

        if (error instanceof Error) {
            throw error
        }

    }
})
const reviewSlice = createSlice({
    name: 'reviews',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getReviewsByProductId.pending, (state:ReviewSlice)=> {
            state.status = Status.PENDING
        })
        .addCase(getReviewsByProductId.rejected, (state: ReviewSlice, action) => {
            state.status = Status.REJECTED
            state.error = action.error.message as string
        }) 
        .addCase(getReviewsByProductId.fulfilled, (state: ReviewSlice, action)=> {
            state.status = Status.FULFILLED
            state.reviews = (action.payload)
        })
    }
})

export const userReviews = (state: RootState) => state.reviews

export default reviewSlice.reducer