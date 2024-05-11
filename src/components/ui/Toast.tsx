import Close from './Close'
import { Toast, Toast_Vairant } from '../../store/types'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeToast } from '../../store/slices/toastSlice'
import ToastCard from './ToastCard'

type Props = {
    toasts: Toast[]
}

const ToastComponent = ({ toasts }: Props) => {

    return (
        <section className=' fixed top-10 right-0 bg-black/30 z-10 flex flex-col gap-4 items-center justify-center z-20'>
            {
                toasts.map(toast => <ToastCard key={toast.id as string} toast={toast} />)
            }
        </section>
    )
}

export default ToastComponent