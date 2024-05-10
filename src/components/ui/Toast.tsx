import React, { Children, MouseEvent, ReactElement } from 'react'
import { createPortal } from 'react-dom'
import Close from './Close'
import { Toast, Toast_Vairant } from '../../store/types'

type Props = {
    toasts: Toast[]
}

const Toast = ({toasts}: Props) => {
    const portalRoot = document.getElementById('root')

    if (!portalRoot) return null

    return createPortal(
        <section className='bg-green-600 fixed top-0 left-0 bg-black/30 z-10 flex items-center justify-center'>
                {
                    toasts.map(toast=>
                        <div key={toast.id} className={`text-${toast.variant === Toast_Vairant.DANGER?'red':toast.variant === Toast_Vairant.SUCCESS?'green':'black'}`}>
                            {toast.msg}
                        </div>
                    )
                    
                }
        </section>, portalRoot
    )
}

export default Toast