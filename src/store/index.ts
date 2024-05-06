import { configureStore } from "@reduxjs/toolkit";
import adminAuth from "./slices/adminAuth";
import { useDispatch } from "react-redux";

export const AdminStore = configureStore ({
    reducer: {
        auth: adminAuth
    }
})

type AdminDisptach = typeof AdminStore.dispatch
type AdminDisptachCallback = () => AdminDisptach
export const useAdminDispatch:AdminDisptachCallback = useDispatch