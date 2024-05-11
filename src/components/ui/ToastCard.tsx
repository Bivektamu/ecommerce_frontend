import Close from './Close'
import { Toast, Toast_Vairant } from '../../store/types'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeToast } from '../../store/slices/toastSlice'

type Props = {
    toast: Toast
}

const ToastCard = ({ toast }: Props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeToast(toast))
        }, 2000)

        return(()=>clearTimeout(timer))

    }, [])

    let csName = ''
    switch (toast.variant) {
        case Toast_Vairant.SUCCESS:
            csName = 'text-green-600 bg-green-100'
            break;
        case Toast_Vairant.INFO:
            csName = 'text-blue-600 bg-blue-100'
            break;
        default:
            csName = 'text-red-600 bg-red-100';
            break;
    }

    return (
        <div  className={csName + ' px-4 py-2 flex items-center gap-4'}>
            {toast.msg}
            <button className='w-4 h-4 relative'>
                <Close classN='bg-red-600' />
            </button>
        </div>)
}

export default ToastCard