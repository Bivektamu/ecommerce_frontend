import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { Colour, FormError, Product, Size, Status, ValidateSchema } from '../store/types'
import CircleLoader from './ui/CircleLoader'
import getClasses from '../utils/getClasses'
import validateForm from '../utils/validate'

type Props = {
    product: Product
}


const ALL_SIZES = [Size.SMALL, Size.MEDIUM, Size.LARGE, Size.EXTRA_LARGE]

function AddToCartForm({ product }: Props) {

    const [formData, setFormData] = useState({
        id: product?.id,
        color: '',
        size: '',
        quantity: 0,
    })

    const [formErrors, setFormErrors] = useState<FormError[]>([])

    useEffect(() => {
        if (product && Object.keys(product).length > 0) {
            setFormData({ ...formData, id: product?.id })
            console.log(product);

        }
    }, [product])

    // code to remove error info when fields are typed
    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            Object.keys(formData).map(key => {
                if (formData[key]) {
                    setFormErrors(prev => ({ ...prev, [key]: '' }))
                }

            })
        }
    }, [formData])


    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.stopPropagation()
        const { name, value } = e.target
        if (name === 'quantity') {
            if (parseInt(value) > product?.quantity) {
                return
            }
            else
                setFormData({ ...formData, quantity: parseInt(value) })
        }
        else {
            setFormData({ ...formData, [name]: value })
        }

    }


    const rangeHandler = (e: MouseEvent<HTMLButtonElement>, type: string) => {
        e.stopPropagation()

        if (type === '-') {
            if (formData.quantity > 0) {
                setFormData({ ...formData, quantity: formData.quantity - 1 })
            }
        }
        else {
            if (formData.quantity < product?.quantity) {
                setFormData({ ...formData, quantity: formData.quantity + 1 })
            }
        }
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()

        const validateSchema: ValidateSchema<any>[] =
            [
                {
                    name: 'color',
                    type: 'text',
                    value: color,
                    msg: 'Please select color'
                },
                {
                    name: 'size',
                    type: 'text',
                    value: size,
                    msg: 'Please select size'
                },

                {
                    name: 'quantity',
                    type: 'number',
                    value: quantity,
                    msg: 'Please select quantity'
                },
            ]

        const errors = validateForm(validateSchema)
        console.log(errors);


        if (Object.keys(errors).length > 0) {
            return setFormErrors({ ...errors })
        }

        console.log({...formData, total: formData.quantity * product?.price});


    }

    const { color, size, quantity } = formData

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-8">
                <p className="text-sm mb-3 font-medium text-slate-500 uppercase text-wider">Availabe Colours</p>
                {(status === Status.PENDING) ? <CircleLoader /> :
                    <div className="flex gap-4 items-center">

                        {
                            product?.colors.map((item: Colour, i) => {

                                const { bgClass, borderClass } = getClasses(item)

                                return (
                                    <fieldset key={i}>
                                        <label htmlFor={item} className={`w-8 h-8 block rounded-full ${bgClass}  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full  after:absolute after:top-0 after:bottom-0 after:-right-1  after:m-auto ${color === item ? `after:${borderClass} after:border-2` : ''} }`}></label>
                                        <input type="radio" id={item} name="color" value={item} onChange={changeHandler} className='appearance-none hidden ' />
                                    </fieldset>
                                )
                            })
                        }
                    </div>
                }
                {formErrors.color && <span className='text-red-500 text-xs'>{formErrors.color}</span>}

            </div>

            <fieldset className='mb-8'>
                <legend className='font-medium text-slate-600 text-sm block mb-2 w-full uppercase'>Select Size</legend>

                <div className="flex gap-4">

                    {
                        ALL_SIZES.map((item, i) =>
                            <fieldset key={i}>
                                <input type="radio" onChange={changeHandler} name="size" id={item} value={item} className='appearance-none hidden' />
                                <label htmlFor={item} className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${product?.sizes.indexOf(item) < 0 ? 'bg-cultured pointer-events-none text-slate-400' : size === item ? 'bg-slate-200' : ''}`}>{item}</label>
                            </fieldset>

                        )
                    }

                </div>
                {formErrors.size && <span className='text-red-500 text-xs'>{formErrors.size}</span>}

            </fieldset>

            <fieldset className='mb-8'>
                <label htmlFor="quantity" className='font-medium text-slate-600 text-sm block mb-2 w-full uppercase'>Quantity</label>
                <div className="flex items-center gap-4 w-min  justtify-start border-cultured border-[2px] rounded px-4 py-2">
                    <button type="button" className='w-6 h-6 relative' onClick={e => rangeHandler(e, '-')}>
                        <span className='w-4 h-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                    </button>

                    <input type="number" name='quantity' value={quantity} onChange={changeHandler} className='w-[50px] text-center outline-none ' />

                    <button type="button" className='w-6 h-6 relative' onClick={e => rangeHandler(e, '+')}>
                        <span className='w-4 h-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                        <span className='h-4 w-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                    </button>

                </div>
                {formErrors.quantity && <span className='text-red-500 text-xs'>{formErrors.quantity}</span>}

            </fieldset>

            <button type="submit" className="w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm" >Add to Cart</button>

        </form>
    )
}

export default AddToCartForm