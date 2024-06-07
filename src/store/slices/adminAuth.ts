import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth, Status, RootState, FormData } from "../types";
import client from "../../data/client";
import { LOGIN_MUTATION } from "../../data/mutation";
import { GET_AUTH } from "../../data/query";

const initialState: Auth = {
    isLoggedIn: false,
    status: Status.IDLE,
    error: ''
}

export const loginAdmin = createAsyncThunk('/admin/login', async ({ email, password }: Partial<Pick<FormData, 'email' | 'password'>>) => {

    try {
        const response = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: { input: { email, password } }
        })

        const token = response.data.logInAdmin.token
        if (token) {
            return token
            
        }
    } catch (error) {
        console.log(error.message);
        throw error
    }
})


export const getAuthStatus = createAsyncThunk('/admin/getAuth', async () => {

    try {
        const response = await client.query({
            query: GET_AUTH,
        })
        console.log(response.data);

        const isLoggedIn = response.data.getAuthStatus.isLoggedIn

        return isLoggedIn
    } catch (error) {
        console.log(error?.message);
        throw error
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOutAdmin: (state) => {
            localStorage.setItem('token', '')
            client.resetStore()
            state.status = Status.FULFILLED
            state.isLoggedIn = false
        },
        // getAuthStatus: (state:Auth) => {
        //     const token = localStorage.getItem('token')

        //     if (token) {
        //         state.isLoggedIn = true
        //     }
        //     else {
        //         state.isLoggedIn = false
        //     }
        //     state.status = Status.FULFILLED
        // }

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

            .addCase(getAuthStatus.pending, (state: Auth) => {
                state.status = Status.PENDING
            })
            .addCase(getAuthStatus.fulfilled, (state: Auth, action) => {
                state.status = Status.FULFILLED
                state.isLoggedIn = action.payload

            })
            .addCase(getAuthStatus.rejected, (state: Auth, action) => {
                state.status = Status.REJECTED
                state.isLoggedIn = false
                state.error = action.error.message as string
            })
    }
})

export default authSlice.reducer
export const { logOutAdmin } = authSlice.actions

export const useAuth = (state: RootState) => state.auth