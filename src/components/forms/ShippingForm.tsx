import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Address, FormError, ValidateSchema } from "../../store/types"
import validateForm from "../../utils/validate"

type Props = {}

const ShippingForm = (props: Props) => {

    const [formData, setFormData] = useState<Address>({
        street: '',
        zipcode: null,
        city: '',
        state: '',
        country: ''
    } as Address)

    const [formErrors, setFormErrors] = useState<FormError>({})


    // code to remove error info when fields are typed
    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            Object.keys(formData).map(key => {
                if (formData[key as keyof Address]) {
                    setFormErrors(prev => ({ ...prev, [key]: '' }))
                }
            })
        }
    }, [formData])

    const { street, zipcode, state, city, country } = formData



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSumbitHandler = (e: FormEvent) => {
        e.preventDefault()

        const validateSchema: ValidateSchema<unknown>[] =
            [
                {
                    name: 'street',
                    type: 'string',
                    value: street,
                    msg: 'Please provide street address'
                },
                {
                    name: 'state',
                    type: 'string',
                    value: state,
                    msg: 'Please provide state'
                },
                {
                    name: 'city',
                    type: 'string',
                    value: city,
                    msg: 'Please provide city'
                },
                {
                    name: 'country',
                    type: 'string',
                    value: country,
                    msg: 'Please provide country'
                },
            ]


        const errors = validateForm(validateSchema)

        console.log(errors);

        if (Object.keys(errors).length > 0) {
            return setFormErrors(prev => ({ ...prev, ...errors }))
        }
    }


    return (
        <form className="grid grid-cols-2 gap-x-20 gap-y-6" onSubmit={onSumbitHandler}>
            <fieldset className="col-span-2">
                <label htmlFor="street" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">Street Address</label>
                <input
                    onChange={e => onChangeHandler(e)}
                    id="street" name="street" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value={street} />

                {formErrors.street && <span className='text-red-500 text-xs'>{formErrors.street}</span>}
            </fieldset>

            <fieldset className="">
                <label htmlFor="city" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">City</label>
                <input
                    onChange={e => onChangeHandler(e)}
                    type="text" id="city" name="city" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value={city} />
                {formErrors.city && <span className='text-red-500 text-xs'>{formErrors.city}</span>}

            </fieldset>
            <fieldset className="">
                <label htmlFor="state" className=" font-medium text-slate-600 text-sm block mb-2 w-full">State</label>
                <input
                    onChange={e => onChangeHandler(e)}
                    type="text" id="state" name="state" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value={state} />
                {formErrors.state && <span className='text-red-500 text-xs'>{formErrors.state}</span>}

            </fieldset>
            <fieldset className="">
                <label htmlFor="zipcode" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">zipcode</label>
                <input
                    onChange={e => onChangeHandler(e)}
                    type="number" inputMode="numeric" id="zipcode" name="zipcode" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value={zipcode as number} />
            </fieldset>

            <fieldset className="mb-4">
                <label htmlFor="country" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">country</label>
                <input
                    onChange={e => onChangeHandler(e)}
                    type="text" id="country" name="country" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value={country} />
                {formErrors.country && <span className='text-red-500 text-xs'>{formErrors.country}</span>}

            </fieldset>
            <button type="submit" id="add_product" className="w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer">Submit</button>
        </form>
    )
}

export default ShippingForm