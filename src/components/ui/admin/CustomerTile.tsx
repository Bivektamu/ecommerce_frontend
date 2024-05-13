import React, { MouseEvent, ReactElement, ReactNode, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import gravatar from 'gravatar'

import { Customer, CustomerInput, Toast, Toast_Vairant } from '../../../store/types'
import getMonth from '../../../utils/getMonth'
import Modal from '../Modal'
import { useDispatch } from 'react-redux';
import { addToast } from '../../../store/slices/toastSlice';
import Check from '../Check';
import Close from '../Close';
import { log } from 'console';

type Props = {
    customer: Customer
}

const CustomerTile = ({ customer }: Props) => {
    const dispatch = useDispatch()
    const [actionId, setActionId] = useState('')
    const [newStatus, setNewStatus] = useState<boolean>(true)
    const [modalContent, setModalContent] = useState<ReactElement | null>(null)
    const [showToast, setShowToast] = useState(false)
    const [gravatarUrl, setGravatarUrl] = useState('')

    useEffect(() => {
        if(customer.email) {
            setGravatarUrl(gravatar.url(customer.email, { s: '200', r: 'pg', d: '404' }))
        }
    }, [customer.email])

    const updateStatus = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const updatedCustomer:CustomerInput = {...customer, isActive: !customer.isActive}
        console.log(updatedCustomer);
    }

    const updateVerification = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const updatedCustomer:CustomerInput = {...customer, isVerified: !customer.isVerified}
        console.log(updatedCustomer);
    }
    const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(customer.id);
    }

    const saveHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        if (!newStatus) {
            const newToast: Toast = {
                id: uuidv4(),
                variant: Toast_Vairant.DANGER,
                msg: 'Please select a status'
            }
            dispatch(addToast(newToast))

        }
    }


    return (
        <div className='grid grid-cols-table-customers px-8 py-4 border-b-[1px] items-center gap-x-8'>
            <img src={gravatarUrl} className='rounded w-16 h-16' />

            <span className='text-sm text-slate-500 '>
                {customer.firstName+' '+customer.lastName}
            </span>

            <span className='text-sm text-slate-500'>
                {customer.email}
            </span>

            <span className='text-sm text-slate-500 capitalize'>
                 {customer.address.street}, {customer.address.suburb}, {customer.address.city}, {customer.address.state.toUpperCase()}, {customer.address.postcode}
            </span>

            <span className='text-sm text-slate-500'>
                {getMonth(customer.timeStamp.getMonth()) + ', ' + customer.timeStamp.getDate()}
            </span>

            <span className='relative text-center'>
                {customer.isActive?<Check classN='w-2 h-4 border-w-2' />:<Close clasN='bg-slate-600 relative w-4' />}
            </span>

            <span className='relative'>
                {customer.isVerified?<Check classN='w-2 h-4 border-w-2' />:<Close clasN='bg-slate-600 relative w-4' />}
            </span>

            {/* <span className='text-sm text-slate-500 flex items-center'>
                <Close classN='w-4 h-4' />
            </span> */}

            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
                <button onClick={() => setActionId('id1')} >...</button>
                {actionId === 'id1' &&
                    <div className='absolute  bg-white border-[1px] rounded-lg shadow w-[140px]  -translate-x-[75px] translate-y-[85px] after:content-[""] after:w-7 after:h-7  after:absolute after:z-10 after:-right-5 after:-top-4' onMouseLeave={() => setActionId('')}>
                        <button onClick={e => updateVerification(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>{customer.isVerified?'Unverify':'Verified'}</button>
                        <button onClick={e => updateStatus(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>{customer.isActive?'Deactivate':'Activate'}</button>
                        <button onClick={e => deleteHandler(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>Delete</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default CustomerTile