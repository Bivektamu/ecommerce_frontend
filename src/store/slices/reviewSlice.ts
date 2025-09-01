import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, ReviewInput, ReviewSlice, RootState, Status } from "../types";
import client from "../../data/client";
import { GET_REVIEWS_BY_PRODUCT_ID } from "../../data/query";
import { CREATE_REVIEW } from "../../data/mutation";
import { useSelector } from "react-redux";

const initialState: ReviewSlice = {
    reviews: [],
    status: Status.IDLE,
    error:'',
    action: null
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


export const addReview = createAsyncThunk('/admin/reviews/add', async (formData:ReviewInput) => {
    try {
        const res = await client.mutate({
            mutation: CREATE_REVIEW,
            variables: {input: formData}
        })
        return res.data.createReview

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
            state.action = null

        }) 
        .addCase(getReviewsByProductId.fulfilled, (state: ReviewSlice, action)=> {
            state.status = Status.FULFILLED
            state.reviews = action.payload;
            state.action = Action.FETCH
        })
        .addCase(addReview.pending, (state: ReviewSlice) => {
            state.status = Status.PENDING
        })
        .addCase(addReview.fulfilled, (state: ReviewSlice, action) => {
            client.resetStore()
            state.status = Status.FULFILLED
            state.reviews.push(action.payload)
            state.action = Action.ADD

        })
        .addCase(addReview.rejected, (state: ReviewSlice, action) => {
            state.status = Status.REJECTED
            state.action = null
            state.error = action.error.message as string
        })
    }
})

export const useReviews = ()=> useSelector((state: RootState) => state.reviews)

export default reviewSlice.reducer