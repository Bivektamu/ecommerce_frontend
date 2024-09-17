import { configureStore } from "@reduxjs/toolkit";
import adminAuth from "./slices/authSlice";
import { useDispatch } from "react-redux";
import toastSlice from "./slices/toastSlice";
import productSlice from "./slices/productSlice";
import customerSlice from "./slices/customerSlice";

export const Store = configureStore ({
    reducer: {
        auth: adminAuth,
        toasts: toastSlice,
        customers:customerSlice,
        products: productSlice
    }
})

type StoreDisptach = typeof Store.dispatch
type StoreDisptachCallback = () => StoreDisptach
export const useStoreDispatch:StoreDisptachCallback = useDispatch