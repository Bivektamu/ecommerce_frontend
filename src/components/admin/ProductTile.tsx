import React, { MouseEvent, useState } from 'react'
import { Product } from '../../store/types'
import { Link } from 'react-router-dom'
import Check from '../../components/ui/Check'
import Close from '../ui/Close'
import Modal from '../ui/Modal'
import { deleteProduct } from '../../store/slices/productSlice'
import { useStoreDispatch } from '../../store'

type Props = {
    product: Product
}

const ProductTile = ({ product }: Props) => {
    const dispatch = useStoreDispatch()

    const [isOption, setIsOption] = useState(false)
    const [showModal, setShowModal] = useState(false)



    const deleteProductFunc = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // setShowModal(false)
        dispatch(deleteProduct(product.id))
    }

    return (
        <div key={product.id} className='grid grid-cols-table px-8 py-4 border-b-[1px] items-center gap-x-4'>
            <Link to={`/admin/products/${product.slug}`}>
                <img src={product.imgs[0].url} alt="" />
            </Link>
            <Link to={`/admin/products/${product.slug}`} className='text-sm text-slate-500'>{product.title}</Link>
            <span className='text-sm text-slate-500 uppercase'>
                {product.sku}
            </span>

            <span className='text-sm text-slate-500'>
                {product.price}
            </span>

            <span className='text-sm text-slate-500'>
                {product.stockStatus ? 'In Stock' : 'Out of Stock'}
            </span>

            <span className='text-sm text-slate-500 capitalize'>
                {product.category}
            </span>


            <span className='relative'>
                {product.featured ? <Check classN='' /> : <Close classN='w-4 bg-black' />}
            </span>


            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
                <button onClick={() => setIsOption(true)} >...</button>
                {
                    isOption &&

                    <div className='absolute bg-white border-[1px] rounded-lg shadow w-[100px]  -translate-x-[55px] translate-y-[45px]' onMouseLeave={() => setIsOption(false)}>
                        <Link className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2' to={`/admin/products/${product.slug}`}>Edit</Link>

                        <button
                            className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pb-4'
                            onClick={() => setShowModal(true)}
                        >Delete</button>
                    </div>
                }

            </div>

            <Modal isOpen={showModal} close={() => setShowModal(false)} >
                <div className='text-center'>
                    <p className="mb-6 font-medium text-sm">Are you sure you want to delete this product?</p>
                    <div className="flex gap-x-4 justify-center">
                        <button
                            className='bg-red-500 text-white px-4 py-2 rounded'
                            onClick={() => setShowModal(false)}

                        >Cancel</button>
                        <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={deleteProductFunc}>Delete</button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default ProductTile