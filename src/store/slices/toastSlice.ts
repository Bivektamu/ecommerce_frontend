import { createSlice } from "@reduxjs/toolkit";
import { RootState, ToastSlice } from "../types";
import { log } from "console";

const initialState: ToastSlice = {
    toasts: []
}

const toastSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToast: (state: ToastSlice, action) => {
            state.toasts.push(action.payload)
        },
        removeToast: (state: ToastSlice, action) => {
            console.log();
            state.toasts = state.toasts.filter(toast=>toast.id !== action.payload)
            // state.toasts.splice(0,1)
            // state.toasts = state.toasts.filter(toast => toast !== action.payload)
        }
    }
})

export default toastSlice.reducer
export const { addToast, removeToast } = toastSlice.actions
export const toasts = (state: RootState) => state.toasts.toasts