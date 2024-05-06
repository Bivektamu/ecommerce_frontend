import React from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../store/slices/adminAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../components/ui/Sidebar'

type Props = {}

const Private = (props: Props) => {
    const useAuth = useSelector(auth)
    const { isLoggedIn } = useAuth

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" />
    }

    const location = useLocation()
    console.log(location)
    if(location.pathname === '/admin') {
        return <Navigate to="/admin/dashboard" />
    }
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Private