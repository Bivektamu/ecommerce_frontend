import React, { Component, MouseEvent, ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAuthStatus, logOutAdmin, useAuth } from '../../store/slices/adminAuth'
import { Link, Navigate, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/ui/Sidebar'
import BreadCrumbs from '../../components/ui/BreadCrumbs'

import { toasts } from "../../store/slices/toastSlice"
import ToastComponent from "../../components/ui/Toast"
import { Status } from '../../store/types'
import Preloader from '../../components/ui/Preloader'
import { useStoreDispatch } from '../../store'

const PrivateRoute = () => {


    const navigate = useNavigate()

    const allToasts = useSelector(toasts)

    const auth = useSelector(useAuth)
    const { isLoggedIn, status } = auth
    const dispatch = useStoreDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(getAuthStatus())
    }, [])


    const logOut = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        dispatch(logOutAdmin())
    }
    

    if (status === Status.IDLE || status === Status.PENDING) {
        return <Preloader />
    }

    if (!isLoggedIn) {
        // return <Navigate to="/login" />
        return navigate('/login')
    }


    if (location.pathname === '/admin' || location.pathname === '/admin/') {
        return navigate('/admin/dashboard')
    }

    return (
        <>
            {
                allToasts?.length > 0 && <ToastComponent toasts={allToasts} />
            }

            <Sidebar />
            <section className="w-full pl-[340px] pb-12 pr-12 pt-8">
                <div className="h-[72px] flex items-center mb-12 justify-between">
                    <BreadCrumbs />
                    <button onClick={logOut}>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8571 12.5V14.7857C11.8571 15.0888 11.7367 15.3795 11.5224 15.5938C11.3081 15.8081 11.0174 15.9286 10.7143 15.9286H2.71427C2.41116 15.9286 2.12047 15.8081 1.90615 15.5938C1.69182 15.3795 1.57141 15.0888 1.57141 14.7857V2.21427C1.57141 1.91116 1.69182 1.62047 1.90615 1.40615C2.12047 1.19182 2.41116 1.07141 2.71427 1.07141H10.7143C11.0174 1.07141 11.3081 1.19182 11.5224 1.40615C11.7367 1.62047 11.8571 1.91116 11.8571 2.21427V4.49998M8.42855 8.49998H16.4286M16.4286 8.49998L14.1428 6.21427M16.4286 8.49998L14.1428 10.7857" stroke="#5C5F6A" strokeWidth="1.43" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>
                <Outlet />

            </section>

        </>
    )
}

export default PrivateRoute