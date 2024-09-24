import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth, Status, RootState, FormData } from "../types";
import client from "../../data/client";
import { LOGIN_ADMIN, LOGIN_CUSTOMER } from "../../data/mutation";
import { GET_AUTH } from "../../data/query";

const initialState: Auth = {
    isLoggedIn: false,
    userRole: null,
    status: Status.IDLE,
    error: ''
}

export const loginAdmin = createAsyncThunk('/admin/login', async ({ email, password }: Partial<Pick<FormData, 'email' | 'password'>>) => {

    try {
        const response = await client.mutate({
            mutation: LOGIN_ADMIN,
            variables: { input: { email, password } }
        })

        const token = response.data.logInAdmin.token
        if (token) {
            return token

        }
    } catch (error) {
        if (error instanceof Error)
            throw error
    }
})



export const logInCustomer = createAsyncThunk('/customer/login', async ({ email, password }: Partial<Pick<FormData, 'email' | 'password'>>) => {

    try {
        const response = await client.mutate({
            mutation: LOGIN_CUSTOMER,
            variables: { input: { email, password } }
        })

        const token = response.data.logInCustomer.token
        if (token) {
            return token
        }
    } catch (error) {
        if (error instanceof Error)
            throw error
    }
})


export const getAuthStatus = createAsyncThunk('/admin/getAuth', async () => {

    try {
        const response = await client.query({
            query: GET_AUTH,
        })
        const isLoggedIn = response.data.getAuthStatus.isLoggedIn
        const userRole = JSON.parse(response.data.getAuthStatus.userRole)
        return { isLoggedIn, userRole }
    } catch (error) {
        if (error instanceof Error)
            throw error
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            client.resetStore()
            localStorage.setItem('token', '')
            state.status = Status.FULFILLED
            state.isLoggedIn = false
            state.userRole = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginAdmin.pending, (state: Auth) => {
                state.status = Status.PENDING
            })
            .addCase(loginAdmin.fulfilled, (state: Auth, action) => {
                client.resetStore()
                localStorage.setItem('token', action.payload)
                state.status = Status.FULFILLED
                state.isLoggedIn = true
            })
            .addCase(loginAdmin.rejected, (state: Auth, action) => {
                localStorage.setItem('token', '')

                state.status = Status.REJECTED
                state.isLoggedIn = false
                state.error = action.error.message as string
            })

            .addCase(logInCustomer.pending, (state: Auth) => {
                state.status = Status.PENDING
            })
            .addCase(logInCustomer.fulfilled, (state: Auth, action) => {
                client.resetStore()
                localStorage.setItem('token', action.payload)
                state.status = Status.FULFILLED
                state.isLoggedIn = true
            })
            .addCase(logInCustomer.rejected, (state: Auth, action) => {
                localStorage.setItem('token', '')
                state.status = Status.REJECTED
                state.isLoggedIn = false
                state.error = action.error.message as string
            })

            .addCase(getAuthStatus.pending, (state: Auth) => {
                state.status = Status.PENDING
            })
            .addCase(getAuthStatus.fulfilled, (state: Auth, action) => {
                state.status = Status.FULFILLED
                state.isLoggedIn = action.payload?.isLoggedIn
                state.userRole = action.payload?.userRole

            })
            .addCase(getAuthStatus.rejected, (state: Auth, action) => {
                state.status = Status.REJECTED
                state.isLoggedIn = false
                state.userRole = null
                state.error = action.error.message as string
            })
    }
})

export default authSlice.reducer
export const { logOut } = authSlice.actions

export const useAuth = (state: RootState) => state.auth