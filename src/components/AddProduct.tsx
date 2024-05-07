import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../store/types'

interface Form extends Omit<Product, 'userId' | 'quantity' | 'price'> {
    quantity: number | null,
    price: number | null,
}

const initial: Form = {
    title: '',
    id: 'pro123',
    sku: '',
    price: null,
    imgs: [],
    slug: '',
    colors: [],
    stockStatus: false,
    sizes: [],
    quantity: null,
    details: '',
    featured: false,
    category: []
}


const AddProduct = () => {

    const [formData, setFormData] = useState<typeof initial>(initial)


    const changeHandler = (e:ChangeEvent) => {
        e.stopPropagation()
        console.log(e)

    }

    const { title, sku, price, imgs, slug, colors, stockStatus, sizes, quantity, details, featured, category } = formData
    return (

        <div className='bg-white rounded-lg'>
            <div className="border-t-[1px] px-8 py-6 border-b-[1px]">
                <span className='font-medium'>Add Product</span>
            </div>
            <div className=' px-8 py-12  max-w-[800px]'>

                <form className='grid grid-cols-2 gap-x-20 gap-y-6'>
                    <fieldset className=''>
                        <label htmlFor="title" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>title</label>
                        <input type="text" id="title" name="title" onChange={changeHandler} value={title} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className=''>
                        <label htmlFor="sku" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>sku</label>
                        <input type="text" id="sku" name="sku" onChange={changeHandler} value={sku} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className=''>
                        <label htmlFor="price" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>price</label>
                        <input type="text" id="price" name="price" onChange={changeHandler} value={price ? price : ''} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className=''>
                        <span className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>images</span>
                        <label htmlFor="images" className='border-[1px] outline-none flex items-center gap-x-4 px-4 py-2 rounded w-full'>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.80769 16.2857H2.41209C2.09441 16.2857 1.78975 16.1595 1.56511 15.9349C1.34048 15.7103 1.21429 15.4056 1.21429 15.0879V5.5055M1.21429 5.5055H16.7857M1.21429 5.5055L3.86143 1.31318C3.96387 1.13559 4.11017 0.987268 4.28634 0.882406C4.46251 0.777545 4.66264 0.719655 4.86758 0.714279H13.1324C13.3374 0.719655 13.5375 0.777545 13.7137 0.882406C13.8898 0.987268 14.0362 1.13559 14.1386 1.31318L16.7857 5.5055M16.7857 5.5055V15.0879C16.7857 15.4056 16.6595 15.7103 16.4349 15.9349C16.2103 16.1595 15.9056 16.2857 15.5879 16.2857H13.1923M6.00545 12.0934L8.99996 9.09889M8.99996 9.09889L11.9945 12.0934M8.99996 9.09889L9.00004 16.2857M9.00004 0.714279V5.50549" stroke="#5C5F6A" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className=' text-slate-500 font-emdium'>
                                Choose product images
                            </span>
                        </label>

                        <input type='file' multiple id="images" name="images" accept="image/png, image/jpeg, image/bmp, image/webp" className='border-[1px] outline-none block px-4 py-2 rounded w-full hidden' placeholder='Choose product images' />
                    </fieldset>

                    <fieldset className=''>
                        <label htmlFor="slug" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>slug</label>
                        <input type="text" id="slug" name="slug" value={slug} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className=''>
                        <legend className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>colors</legend>
                        <div className="flex gap-4 items-center">
                            <input type="checkbox" id="black" name="black" value='black' className='hidden appearance-none' />
                            <label htmlFor="black" className='w-8 h-8 rounded-full bg-black  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-slate-800 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1'></label>

                            <label htmlFor="red" className='w-8 h-8 rounded-full bg-red-600  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-red-600 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1'></label>

                            <input type="checkbox" id="red" name="red" value='red' className='appearance-none hidden ' />

                            <label htmlFor="gray" className='w-8 h-8 rounded-full bg-gray-600  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-gray-600 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1'></label>

                            <input type="checkbox" id="gray" name="gray" value='gray' className='appearance-none hidden ' />

                            <label htmlFor="white" className='w-8 h-8 rounded-full bg-regal-white  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-regal-white after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1'></label>

                            <input type="checkbox" id="white" name="white" value='white' className='appearance-none hidden ' />


                            <label htmlFor="amber" className='w-8 h-8 rounded-full bg-amber-300  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-amber-300 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1'></label>

                            <input type="checkbox" id="amber" name="amber" value='amber' className='appearance-none hidden ' />

                            {/* rgb(226, 226, 226) */}

                        </div>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="stock" className='font-medium text-slate-600 text-sm block mb-2 w-full'>Stock status</label>
                        {/* <input type="text" id="slug" name="slug" value={''} className='border-[1px] outline-none block px-4 py-2 rounded w-full' /> */}

                        <select name="stock" id="stock" className='border-[1px] outline-none block px-4 py-2 rounded w-full'>
                            <option value="" hidden>Select stock status</option>
                            <option className='outline-none block px-4 py-2 rounded w-full' value="1">In Stock</option>
                            <option className='outline-none block px-4 py-2 rounded w-full' value="0">Out of Stock</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className='font-medium text-slate-600 text-sm block mb-2 w-full '>Stock status</legend>

                        <div className="flex gap-4">

                            <input type="checkbox" name="small" id="small" value='s' className='appearance-none hidden' />
                            <label htmlFor="small" className='w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] '>S</label>


                            <input type="checkbox" name="medium" id="medium" value='m' className='appearance-none hidden' />
                            <label htmlFor="medium" className='w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] '>M</label>


                            <input type="checkbox" name="large" id="large" value='l' className='appearance-none hidden' />
                            <label htmlFor="large" className='w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] '>L</label>

                            <input type="checkbox" name="large" id="large" value='xl' className='appearance-none hidden' />
                            <label htmlFor="large" className='w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px]'>XL</label>
                        </div>
                    </fieldset>

                    <fieldset className=''>
                        <label htmlFor="quantity" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>Available quantity</label>
                        <input type="text" id="quantity" name="quantity" value={quantity ? quantity : ''} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className='flex items-center gap-4'>
                        <input type="checkbox" name="small" id="small" className='appearance-none w-6 h-6 border-[1px] rounded' />
                        <label htmlFor='featured' className='font-medium  text-slate-600'>Is Featured</label>

                    </fieldset>

                    <fieldset className='col-span-2'>
                        <label htmlFor="description" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>Available description</label>
                        <textarea id="description" name="description" className='border-[1px] outline-none block px-4 py-2 rounded w-full max-w-full h-32'>{details}</textarea>
                    </fieldset>

                    <button type="submit" className='w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer'>Add Product</button>



                </form>
            </div>
        </div>

    )
}

export default AddProduct