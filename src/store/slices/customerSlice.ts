import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, CustomerInput, CustomerSlice, Status, RootState } from "../types";
import client from "../../data/client";
import { CREATE_CUSTOMER } from "../../data/mutation";
import { GET_CUSTOMER } from "../../data/query";

const initialState: CustomerSlice = {
    status: Status.IDLE,
    error: null,
    customers: [],
    customer: '',
    action: null
}

export const createCustomer = createAsyncThunk('/customer/add', async (formData: CustomerInput) => {
    try {
        const response = await client.mutate({
            mutation: CREATE_CUSTOMER,
            variables: { input: formData }
        })
        return response.data.createCustomer.id

    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
    }
})


export const getCustomer = createAsyncThunk(`/customer/:id`, async (id: string) => {
    try {
        const response = await client.query({
            query: GET_CUSTOMER,
            variables: { customerId: id }
        })
        
        return response.data.customer

    } catch (error) {
        if (error instanceof Error) {
            
            throw error
        }
    }
})

const customerSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.customer = action.payload
                state.action = Action.ADD
                state.error = null
                state.status = Status.FULFILLED
            })
            .addCase(createCustomer.pending, (state) => {
                state.status = Status.PENDING
                state.error = null
            })

            .addCase(createCustomer.rejected, (state, action) => {
                state.error = action.error.message as string
                state.status = Status.REJECTED
                state.customer = null
            })

            .addCase(getCustomer.fulfilled, (state, action) => {
                state.customer = action.payload
                state.action = Action.FETCH
                state.error = null
                state.status = Status.FULFILLED
            })
            .addCase(getCustomer.pending, (state) => {
                state.status = Status.PENDING
                state.error = null
            })

            .addCase(getCustomer.rejected, (state, action) => {
                state.error = action.error.message as string
                state.status = Status.REJECTED
                state.customer = null
            })
    }
})

export const useCustomer = (state: RootState) => state.customers
export default customerSlice.reducer;