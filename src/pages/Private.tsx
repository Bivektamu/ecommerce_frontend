import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAuthStatus, useAuth } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Status, Role } from '../store/types'
import { useStoreDispatch } from '../store'
import ProgressLoader from '../components/ui/ProgressLoader'
// import Preloader from '../components/ui/Preloader'

type Props = {
    children: ReactNode
}
const Private = ({ children }: Props) => {

    const navigate = useNavigate()

    const auth = useSelector(useAuth)
    const { isLoggedIn, status, user } = auth
    const dispatch = useStoreDispatch()

    useEffect(() => {
        if (status === Status.IDLE)
            dispatch(getAuthStatus())
    }, [status, dispatch])

    useEffect(() => {
        if (status === Status.FULFILLED && !isLoggedIn) {
            console.log('saf');

            navigate('/')
        }
        else if (status === Status.REJECTED) {
            console.log('saf');
            navigate('/')
        }

    }, [isLoggedIn, status])

    useEffect(() => {

        if (user && user.role !== Role.CUSTOMER) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            {
                status !== Status.FULFILLED ?
                    (<ProgressLoader cssClass='mt-32' />) :
                    (
                        children)
            }

        </>
    )
}

export default Private