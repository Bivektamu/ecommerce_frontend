import React, { Children, MouseEvent, ReactElement } from 'react'
import { createPortal } from 'react-dom'
import Close from './Close'

type Props = {
    close: (e: MouseEvent<HTMLButtonElement>)=> void,
    children: ReactElement
}

const Modal = ({children, close}: Props) => {
    const portalRoot = document.getElementById('root')

    if (!portalRoot) return null
    return createPortal(
        <section className='w-full h-screen fixed top-0 left-0 bg-black/30 z-10 flex items-center justify-center'>
            <div className='p-12 bg-white rounded-lg w-[500px] max-w-full text-center relative'>
                <button className='w-6 h-6 absolute right-4 top-4' onClick={close}>
                    <Close classN='bg-black' />
                </button>
                {
                    {...children}
                }
            </div>
        </section>, portalRoot
    )
}

export default Modal