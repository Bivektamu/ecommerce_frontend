import { ProductInput, ProductSlice, Status, RootState, Action } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_PRODUCT, DELETE_PRODUCT } from "../../data/mutation";
import client from "../../data/client";
import { GET_PRODUCTS } from "../../data/query";

const initialState: ProductSlice = {
    status: Status.IDLE,
    error: '',
    products: [],
    action: null
}

export const addProduct = createAsyncThunk('/admin/product/add', async (formData: ProductInput) => {

    try {
        const response = await client.mutate({
            mutation: CREATE_PRODUCT,
            variables: { input: formData }
        })

        return response.data.createProduct

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message);

            throw error
        }
    }
})

export const deleteProduct = createAsyncThunk('/admin/product/delete', async (id: string) => {

    try {
        const response = await client.mutate({
            mutation: DELETE_PRODUCT,
            variables: { deleteProductId: id}
        })

        return response.data.deleteProduct

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message);
            throw error
        }
    }
})


export const getProducts = createAsyncThunk('/admin/products', async () => {

    try {

        const response = await client.query({
            query: GET_PRODUCTS
        })

        return response.data.products

    } catch (error) {

        if (error instanceof Error) {
            console.log(error.message);

            throw error
        }
    }
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       
    },
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, (state: ProductSlice) => {
                state.status = Status.PENDING
            })
            .addCase(getProducts.fulfilled, (state: ProductSlice, action) => {
                state.status = Status.FULFILLED
                state.action = Action.FETCH
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state: ProductSlice, action) => {
                state.status = Status.REJECTED
                state.error = action.error.message as string
            })
            .addCase(addProduct.pending, (state: ProductSlice) => {
                state.status = Status.PENDING
            })
            .addCase(addProduct.fulfilled, (state: ProductSlice, action) => {
                client.resetStore()
                state.status = Status.FULFILLED
                state.products.push(action.payload)
                state.action = Action.ADD
            })
            .addCase(addProduct.rejected, (state: ProductSlice, action) => {
                state.status = Status.REJECTED
                state.error = action.error.message as string
            })
            .addCase(deleteProduct.pending, (state: ProductSlice) => {
                state.status = Status.PENDING
            })
            .addCase(deleteProduct.fulfilled, (state: ProductSlice, action) => {
                client.resetStore()
                state.status = Status.FULFILLED
                state.action = Action.DELETE
            })
            .addCase(deleteProduct.rejected, (state: ProductSlice, action) => {
                state.status = Status.REJECTED
                state.error = action.error.message as string
            })
    }
})

export default productSlice.reducer
export const {resetStatus} = productSlice.actions
export const useProduct = (state: RootState) => state.products