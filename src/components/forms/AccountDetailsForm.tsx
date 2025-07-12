import React, { useState } from 'react'
import { FormData } from '../../store/types'



const AccountDetailsForm = () => {


    const [formData, setFormData] = useState<Omit<FormData, 'password'>>({
        firstName: '',
        lastName: '',
        email: '',
    })
    const [errors, setErrors] = useState<FormError>({})

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { firstName, lastName, email } = formData
    return (
        <form>
            <fieldset className='mb-6'>
                <label htmlFor="firstName" className='font-medium block mb-1 text-slate-600 text-sm'>First name</label>
                <input type="text" id="firstName" name='firstName' value={firstName} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4 ' />
                {errors.firstName && <span className='text-xs text-red-500'>{errors.firstName}</span>}
            </fieldset>

            <fieldset className='mb-6'>
                <label htmlFor="lastName" className='font-medium block mb-1 text-slate-600 text-sm'>Last name</label>
                <input type="text" name='lastName' id="lastName" value={lastName} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4 ' />
                {errors.lastName && <span className='text-xs text-red-500'>{errors.lastName}</span>}
            </fieldset>

            <fieldset className='mb-6'>
                <label htmlFor="email" className='font-medium block mb-1 text-slate-600 text-sm'>Email</label>
                <input type="text" id="email" name='email' value={email} onChange={changeHandler} className='border-[1px] border-slate-300 rounded-md block text-sm text-black w-full py-2 px-4 ' />
                {errors.email && <span className='text-xs text-red-500'>{errors.email}</span>}
            </fieldset>

            <button className="bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm">Save Changes</button>
        </form>
    )
}

export default AccountDetailsForm