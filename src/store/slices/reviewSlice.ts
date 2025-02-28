import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReviewSlice, RootState } from "../types"; 
import client from "../../data/client";

const initialState:ReviewSlice = {
    reviews: []
}

// const getReviews = createAsyncThunk('/admin/reviews', async () => {
//     try {
//         const res = await client.query({
//             query: 
//         })
        
//     } catch (error) {
        
//     }
// })
const reviewSlice = createSlice({
    name:'reviews',
    initialState: initialState,
    reducers: {},
    // extraReducers: builder => {
    //     builder
    //     .addCase(()=> {})
    // }
})

export const userReviews = (state:RootState) => state.reviews

export default reviewSlice.reducer