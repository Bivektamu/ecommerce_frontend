import { configureStore } from "@reduxjs/toolkit";
import adminAuth from "./slices/adminAuth";
import { useDispatch } from "react-redux";
import toastSlice from "./slices/toastSlice";

export const AdminStore = configureStore ({
    reducer: {
        auth: adminAuth,
        toasts: toastSlice
    }
})

type AdminDisptach = typeof AdminStore.dispatch
type AdminDisptachCallback = () => AdminDisptach
export const useAdminDispatch:AdminDisptachCallback = useDispatch