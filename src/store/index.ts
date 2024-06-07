import { configureStore } from "@reduxjs/toolkit";
import adminAuth from "./slices/adminAuth";
import { useDispatch } from "react-redux";
import toastSlice from "./slices/toastSlice";
import productSlice from "./slices/productSlice";

export const AdminStore = configureStore ({
    reducer: {
        auth: adminAuth,
        toasts: toastSlice,
        products: productSlice
    }
})

type AdminDisptach = typeof AdminStore.dispatch
type AdminDisptachCallback = () => AdminDisptach
export const useAdminDispatch:AdminDisptachCallback = useDispatch