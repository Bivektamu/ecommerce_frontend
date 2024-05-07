import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductColor, ProductSize, ProductImage } from '../store/types'

interface Form extends Omit<Product, 'userId' | 'quantity' | 'price'> {
    quantity: number | null,
    price: number | null,
}

interface PrviewImage {
    id:string,
    src:string
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
    const [imgPreviews, setImagePreviews] = useState<PrviewImage[]>([])

    const { title, sku, price, imgs, slug, colors, stockStatus, sizes, quantity, details, featured, category } = formData


    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.stopPropagation()

        let val: string | string[] | ProductImage[] | boolean

        if (e.target.type === 'file') {

            const event = e.target as HTMLInputElement
            const files: FileList = event.files as FileList
            val = [...imgs] as ProductImage[]
            for (let i = 0; i < files!.length; i++) {
                const file: ProductImage = {
                    id:uuidv4(),
                    img: files![i]
                }
                val.push(file)
            }

        }
        else if (e.target.type === 'checkbox') {
            const event = e.target as HTMLInputElement

            if (event.checked) {
                if (event.name === 'colors') {
                    val = [...colors, event.value.toUpperCase()]
                }
                else if (event.name === 'sizes') {
                    val = [...sizes, event.value.toUpperCase()]
                }
                else {
                    val = event.checked
                }

            }
            else {
                if (event.name === 'colors') {
                    val = [...colors.filter(color => color !== event.value.toUpperCase())]
                }
                else if (event.name === 'sizes') {
                    val = [...sizes.filter(size => size !== event.value.toUpperCase())]
                }
                else {
                    val = event.checked
                }
            }


        }
        else {
            val = e.target.value
        }

        setFormData(prev => ({
            ...prev,
            [e.target.name]: val
        }))
    }

    const previewHandler = (e:MouseEvent<HTMLButtonElement>, id:string) => {
        e.preventDefault()
        e.stopPropagation()
        let updateImgs = [...imgs]
        const index = updateImgs.findIndex(img=>img.id === id)
        updateImgs.splice(index, 1)
        console.log(updateImgs);
        
        setFormData(prev=>({...prev, imgs: [...updateImgs]}))
    }

    useEffect(() => {

        

        if (imgs.length > 0) {
            let previews: PrviewImage[] = []

            console.log(previews.length, imgs.length);
            

            imgs.forEach((productImg:ProductImage) => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.result) {
                        const newPreview = {
                            id:productImg.id,
                            src: reader.result as string
                        }
                        previews.push(newPreview);
                        if (previews.length === imgs.length) {
                            setImagePreviews(previews);
                        }
                    }
                };
                reader.readAsDataURL(productImg.img);
            })
        }
        else {
            setImagePreviews([])
        }
    }, [imgs])

    useEffect(() => {
        // console.log(imgPreviews)
    }, [imgPreviews])

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
                                <path d="M4.80769 16.2857H2.41209C2.09441 16.2857 1.78975 16.1595 1.56511 15.9349C1.34048 15.7103 1.21429 15.4056 1.21429 15.0879V5.5055M1.21429 5.5055H16.7857M1.21429 5.5055L3.86143 1.31318C3.96387 1.13559 4.11017 0.987268 4.28634 0.882406C4.46251 0.777545 4.66264 0.719655 4.86758 0.714279H13.1324C13.3374 0.719655 13.5375 0.777545 13.7137 0.882406C13.8898 0.987268 14.0362 1.13559 14.1386 1.31318L16.7857 5.5055M16.7857 5.5055V15.0879C16.7857 15.4056 16.6595 15.7103 16.4349 15.9349C16.2103 16.1595 15.9056 16.2857 15.5879 16.2857H13.1923M6.00545 12.0934L8.99996 9.09889M8.99996 9.09889L11.9945 12.0934M8.99996 9.09889L9.00004 16.2857M9.00004 0.714279V5.50549" stroke="#5C5F6A" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className=' text-slate-500 font-emdium'>
                                Choose product images
                            </span>
                        </label>


                        {/* /////////////////////////// */}
                        <input type='file' multiple id="images" name="imgs" accept="image/png, image/jpeg, image/bmp, image/webp" className='border-[1px] outline-none block px-4 py-2 rounded w-full hidden' placeholder='Choose product images' onChange={changeHandler} />
                        {
                            imgPreviews.length > 0 &&
                            <div className='flex gap-x-4 gap-y-8 mt-8 flex-wrap'>
                                {
                                    imgPreviews.map((img:PrviewImage) =>
                                        <div key={img.id} className='relative'>
                                            <img  className='w-14 h-14 object-cover' src={img.src} />
                                            <button onClick={(e)=>previewHandler(e, img.id)} type='button' className='w-6 h-6  flex items-center justify-center rounded-full bg-slate-400 absolute -top-3 -right-3 after:content[""] after:w-4 after:h-[2px] after:bg-slate-600 after:rotate-45 after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:absolute before:content[""] before:w-4 before:h-[2px] before:bg-slate-600 before:-rotate-45'></button>
                                        </div>
                                    )
                                }

                            </div>
                        }
                    </fieldset>

                    <fieldset className=''>
                        <label htmlFor="slug" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>slug</label>
                        <input type="text" id="slug" name="slug" value={slug} onChange={changeHandler} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className=''>
                        <legend className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>colors</legend>
                        <div className="flex gap-4 items-center">
                            <input type="checkbox" id="black" name="colors" onChange={changeHandler} value={ProductColor.BLACK} className='hidden appearance-none' />
                            <label htmlFor="black" className={`w-8 h-8 rounded-full bg-black  cursor-pointer relative ${colors.indexOf(ProductColor.BLACK) > -1 ? 'after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-slate-800 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1' : ''}  `}></label>

                            <label htmlFor="red" className={`w-8 h-8 rounded-full bg-red-600  cursor-pointer relative ${colors.indexOf(ProductColor.RED) > -1 ? 'after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-red-600 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1' : ''}`}></label>

                            <input type="checkbox" id="red" name="colors" onChange={changeHandler} value={ProductColor.RED} className='appearance-none hidden ' />

                            <label htmlFor="gray" className={`w-8 h-8 rounded-full bg-gray-600  cursor-pointer relative ${colors.indexOf(ProductColor.GRAY) > -1 ? 'after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-gray-600 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1' : ''}`}></label>

                            <input type="checkbox" id="gray" name="colors" onChange={changeHandler} value={ProductColor.GRAY} className='appearance-none hidden ' />

                            <label htmlFor="white" className={`w-8 h-8 rounded-full bg-regal-white  cursor-pointer relative ${colors.indexOf(ProductColor.WHITE) > -1 ? 'after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-regal-white after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1' : ''}`}></label>

                            <input type="checkbox" id="white" name="colors" onChange={changeHandler} value={ProductColor.WHITE} className='appearance-none hidden ' />


                            <label htmlFor="amber" className={`w-8 h-8 rounded-full bg-amber-300  cursor-pointer relative ${colors.indexOf(ProductColor.AMBER) > -1 ? 'after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 after:border-amber-300 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1' : ''}`}></label>

                            <input type="checkbox" id="amber" name="colors" onChange={changeHandler} value={ProductColor.AMBER} className='appearance-none hidden ' />


                        </div>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="stock" className='font-medium text-slate-600 text-sm block mb-2 w-full'>Stock status</label>


                        <select name="stockStatus" id="stock" className='border-[1px] outline-none block px-4 py-2 rounded w-full' onChange={changeHandler}>
                            <option value="" hidden>Select stock status</option>
                            <option className='outline-none block px-4 py-2 rounded w-full' value='true'>In Stock</option>
                            <option className='outline-none block px-4 py-2 rounded w-full' value="false">Out of Stock</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className='font-medium text-slate-600 text-sm block mb-2 w-full '>Size</legend>

                        <div className="flex gap-4">

                            <input type="checkbox" onChange={changeHandler} name="sizes" id="small" value={ProductSize.SMALL} className='appearance-none hidden' />
                            <label htmlFor="small" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${sizes.indexOf(ProductSize.SMALL) > -1 ? 'bg-slate-200' : ''}`}>S</label>


                            <input type="checkbox" onChange={changeHandler} name="sizes" id="medium" value={ProductSize.MEDIUM} className='appearance-none hidden' />
                            <label htmlFor="medium" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${sizes.indexOf(ProductSize.MEDIUM) > -1 ? 'bg-slate-200' : ''}`}>M</label>


                            <input type="checkbox" onChange={changeHandler} name="sizes" id="large" value={ProductSize.LARGE} className='appearance-none hidden' />
                            <label htmlFor="large" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${sizes.indexOf(ProductSize.LARGE) > -1 ? 'bg-slate-200' : ''}`}>L</label>

                            <input type="checkbox" onChange={changeHandler} name="sizes" id="extraLarge" value={ProductSize.EXTRA_LARGE} className='appearance-none hidden' />
                            <label htmlFor="extraLarge" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${sizes.indexOf(ProductSize.EXTRA_LARGE) > -1 ? 'bg-slate-200' : ''}`}>XL</label>
                        </div>
                    </fieldset>

                    <fieldset className=''>
                        <label htmlFor="quantity" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>Available quantity</label>
                        <input type="text" id="quantity" name="quantity" onChange={changeHandler} value={quantity ? quantity : ''} className='border-[1px] outline-none block px-4 py-2 rounded w-full' />
                    </fieldset>

                    <fieldset className='flex items-center gap-4'>
                        <input type="checkbox" name="featured" id="featured" onChange={changeHandler} className=' w-6 h-6 border-[1px] rounded accent-slate-600' />
                        <label htmlFor='featured' className='font-medium  text-slate-600'>Is Featured</label>

                    </fieldset>

                    <fieldset className='col-span-2'>
                        <label htmlFor="description" className='capitalize font-medium text-slate-600 text-sm block mb-2 w-full'>Available description</label>
                        <textarea id="description" name="details" className='border-[1px] outline-none block px-4 py-2 rounded w-full max-w-full h-32' onChange={changeHandler} value={details} />
                    </fieldset>

                    <button type="submit" className='w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer'>Add Product</button>

                </form>
            </div>
        </div>

    )
}

export default AddProduct