import { configureStore } from "@reduxjs/toolkit";
import adminAuth from "./slices/adminAuth";
import { useDispatch } from "react-redux";
import toastSlice from "./slices/toastSlice";
import productSlice from "./slices/productSlice";

export const Store = configureStore ({
    reducer: {
        auth: adminAuth,
        toasts: toastSlice,
        products: productSlice
    }
})

type StoreDisptach = typeof Store.dispatch
type StoreDisptachCallback = () => StoreDisptach
export const useStoreDispatch:StoreDisptachCallback = useDispatch