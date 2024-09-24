import  { MouseEvent, useEffect, useState } from 'react'
import gravatar from 'gravatar'

import { Customer, CustomerEditInput } from '../../store/types'
import getMonth from '../../utils/getMonth'
import Check from '../ui/Check';
import Close from '../ui/Close';
type Props = {
    customer: Customer
}

const CustomerTile = ({ customer }: Props) => {
    const [actionId, setActionId] = useState('')
    const [gravatarUrl, setGravatarUrl] = useState('')

    useEffect(() => {

        if (customer.email) {
            const link = gravatar.url(customer.email, { s: '200', r: 'pg', d: 'mp' });
            setGravatarUrl(link)
        }
    }, [customer.email])

    const updateStatus = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const updatedCustomer: CustomerEditInput = { ...customer, isActive: !customer.isActive }
        console.log(updatedCustomer);
    }

    const updateVerification = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const updatedCustomer: CustomerEditInput = { ...customer, isVerified: !customer.isVerified }
        console.log(updatedCustomer);
    }
    const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(customer.id);
    }


    return (
        <div className='grid grid-cols-table-customers px-8 py-4 border-b-[1px] items-start gap-x-8'>
            <img src={gravatarUrl} className='rounded w-16 h-16' />
            <span className='text-sm text-slate-500 '>
                {customer.firstName + ' ' + customer.lastName}
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
                {customer.isActive ? <Check classN='w-2 h-4 border-w-2' /> : <Close classN='bg-slate-600 relative w-4' />}
            </span>

            <span className='relative pt-3'>
                {customer.isVerified ? <Check classN='w-2 h-4 border-w-2' /> : <Close classN='bg-slate-600 relative w-4' />}
            </span>

            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
                <button onClick={() => setActionId('id1')} >...</button>
                {actionId === 'id1' &&
                    <div className='absolute  bg-white border-[1px] rounded-lg shadow w-[140px]  -translate-x-[75px] translate-y-[85px] after:content-[""] after:w-7 after:h-7  after:absolute after:z-10 after:-right-5 after:-top-4' onMouseLeave={() => setActionId('')}>
                        <button onClick={e => updateVerification(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>{customer.isVerified ? 'Unverify' : 'Verifiy'}</button>
                        <button onClick={e => updateStatus(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>{customer.isActive ? 'Deactivate' : 'Activate'}</button>
                        <button onClick={e => deleteHandler(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>Delete</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default CustomerTile