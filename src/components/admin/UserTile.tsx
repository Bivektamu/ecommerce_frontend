import { MouseEvent, useEffect, useState } from 'react'
import { User } from '../../store/types'
import getMonth from '../../utils/getMonth'
import Check from '../ui/Check';
import Close from '../ui/Close';
import useAvatar from '../hooks/useAvatar';
type Props = {
    user: User
}

const UserTile = ({ user }: Props) => {
    const [actionId, setActionId] = useState('')
    const { avatar, setAvatarEmail } = useAvatar()

    useEffect(() => {

        if (user.email) {
            setAvatarEmail(user.email)
        }
    }, [user.email])

    const updateStatus = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // const updatedUser: UserEditInput = { ...user, isActive: !user.isActive }
        // console.log(updatedUser);
    }

    const updateVerification = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // const updatedUser: UserEditInput = { ...user, isVerified: !user.isVerified }
        // console.log(updatedUser);
    }
    const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // console.log(user.id);
    }


    return (
        <div className='grid grid-cols-table-users px-8 py-4 border-b-[1px] items-start gap-x-8'>
            {/* <img src={gravatarUrl} className='rounded w-16 h-16' /> */}
            <div className="rounded w-16 h-16">
                {avatar}
            </div>
            <span className='text-sm text-slate-500 '>
                {user.firstName + ' ' + user.lastName}
            </span>

            <span className='text-sm text-slate-500'>
                {user.email}
            </span>

            <span className='text-sm text-slate-500 capitalize'>
                {
                    user.address.street ? `${user.address.street}, ${user.address.city}, ${user.address.city}, ${user.address.state.toUpperCase()}, ${user.address.postcode} ` : 'Not Available'
                }
            </span>

            <span className='text-sm text-slate-500'>
                {
                    (new Date(user.registeredDate)).getDate()
                    + ' ' +
                    getMonth((new Date(user.registeredDate)).getMonth())
                    + ' ' +
                    (new Date(user.registeredDate)).getFullYear()

                }
            </span>

            <span className='relative text-center'>
                {user.isActive ? <Check classN='w-2 h-4 border-w-2' /> : <Close classN='bg-slate-600 relative w-4' />}
            </span>

            <span className='relative pt-3'>
                {user.isVerified ? <Check classN='w-2 h-4 border-w-2' /> : <Close classN='bg-slate-600 relative w-4' />}
            </span>

            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
                <button onClick={() => setActionId('id1')} >...</button>
                {actionId === 'id1' &&
                    <div className='absolute  bg-white border-[1px] rounded-lg shadow w-[140px]  -translate-x-[75px] translate-y-[85px] after:content-[""] after:w-7 after:h-7  after:absolute after:z-10 after:-right-5 after:-top-4' onMouseLeave={() => setActionId('')}>
                        <button onClick={e => updateVerification(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>{user.isVerified ? 'Unverify' : 'Verifiy'}</button>
                        <button onClick={e => updateStatus(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>{user.isActive ? 'Deactivate' : 'Activate'}</button>
                        <button onClick={e => deleteHandler(e)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>Delete</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default UserTile