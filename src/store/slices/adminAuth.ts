import { createSlice } from "@reduxjs/toolkit";
import { Auth, Status, RootState } from "../types";

const initialState:Auth = {
    isLoggedIn:false,
    status:Status.IDLE,
    error:''
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginAdmin: (state:Auth, action) => {
            console.log(action)
            state.isLoggedIn = true
            state.status = Status.FULFILLED
        }
    }
})

export default authSlice.reducer
export const {loginAdmin} = authSlice.actions
export const auth = (state: RootState) => state.auth