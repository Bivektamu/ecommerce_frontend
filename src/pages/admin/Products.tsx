import React, { MouseEvent, act, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Close from '../../components/ui/Close'
import { useAdminDispatch } from '../../store'
import { deleteProduct, getProducts, useProduct } from '../../store/slices/productSlice'
import { useSelector } from 'react-redux'
import Preloader from '../../components/ui/Preloader'
import { Action, Product, Status, Toast, Toast_Vairant } from '../../store/types'
import Check from '../../components/ui/Close'
import { v4 as uuidv4 } from 'uuid';
import { addToast } from '../../store/slices/toastSlice'


const Products = () => {

  const dispatch = useAdminDispatch()

  const { products, status, action } = useSelector(useProduct)

  const [actionId, setActionId] = useState('')




  useEffect(() => {
    if (action === Action.ADD) {
      const newToast: Toast = {
        id: uuidv4(),
        variant: Toast_Vairant.SUCCESS,
        msg: 'Product added successfully.'
      }
      dispatch(addToast(newToast))
    }

    
    dispatch(getProducts())

  }, [])


  useEffect(() => {
    if (action === Action.DELETE) {
      const newToast: Toast = {
        id: uuidv4(),
        variant: Toast_Vairant.SUCCESS,
        msg: 'Product deleted.'
      }
      dispatch(addToast(newToast))
      dispatch(getProducts())
    }
  }, [action])

  const deleteProductHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    dispatch(deleteProduct(id))
  }

  if (status == Status.IDLE || status == Status.PENDING) {
    return <Preloader />
  }

  if (status === Status.FULFILLED && action !== Action.FETCH) {
    return <Preloader />
  }

  console.log(products);
  

  return (

    <div className='bg-white rounded-lg'>
      <div className="flex justify-between p-8 items-center">
        <p className="font-semibold">Products</p>
        <div className="flex gap-x-4 ">

          <div className='relative'>
            <svg className='absolute top-0 bottom-0 m-auto left-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.2252 18.4799C13.28 18.4799 15.2507 17.6636 16.7036 16.2106C18.1566 14.7577 18.9729 12.787 18.9729 10.7322C18.9729 8.67737 18.1566 6.70672 16.7036 5.25374C15.2507 3.80077 13.28 2.9845 11.2252 2.9845C9.17038 2.9845 7.19973 3.80077 5.74675 5.25374C4.29378 6.70672 3.47751 8.67737 3.47751 10.7322C3.47751 12.787 4.29378 14.7577 5.74675 16.2106C7.19973 17.6636 9.17038 18.4799 11.2252 18.4799Z" stroke="#5C5F6A" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.5225 21.0155L16.5782 17.0712" stroke="#5C5F6A" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input type='text' readOnly className='text-black py-2 px-4 rounded cursor-pointer border-slate-400 border-[1px] text-sm text-left outline-none pl-10' value={''} placeholder='Search products' />
          </div>

          <Link to="/admin/products/add" className='bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm'>Add Product</Link>
        </div>
      </div>



      <div className='grid grid-cols-table gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] mb-6'>
        <button>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.3087L3.37549 1.00035M3.37549 1.00035L5.75246 3.30726M3.37549 1.00035L3.37935 13M13 10.692L10.6238 12.9997M10.6238 12.9997L8.24754 10.692M10.6238 12.9997V1" stroke="#474B57" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className='text-sm text-slate-500 font-medium'>
          Name
        </span>
        <span className='text-sm text-slate-500 font-medium'>
          SKU
        </span>

        <span className='text-sm text-slate-500 font-medium'>
          Price
        </span>

        <span className='text-sm text-slate-500 font-medium'>
          Stock
        </span>

        <span className='text-sm text-slate-500 font-medium'>
          Categories
        </span>


        <span className='text-sm text-slate-500 font-medium'>
          Featured
        </span>

        <span className='text-sm text-slate-500 font-medium'>
          Action
        </span>
      </div>

      {
        products && products.length === 0 &&
        <p className='px-8 py-8 text-slate-500'>There are no products. Please add new product.</p>
      }

      <div className="w-full">

        {products && products.length > 0 && products.map(product =>
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

            <span className='text-sm text-slate-500'>
              {product.category}
            </span>


            <span className='text-sm text-slate-500 w-4 h-4 relative'>
              {product.featured ? <Check classN='w-full bg-black' /> : <Close classN='w-full bg-black' />}
            </span>


            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
              <button onClick={() => setActionId(product.id)} >...</button>
              {actionId === product.id &&
                <div className='absolute bg-white border-[1px] rounded-lg shadow w-[100px]  -translate-x-[55px] translate-y-[75px]' onMouseLeave={() => setActionId('')}>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pt-4'>View</button>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2'>Edit</button>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pb-4' onClick={e => deleteProductHandler(e, product.id)} >Delete</button>
                </div>
              }

            </div>

          </div>
        )}




      </div>

    </div>
  )
}

export default Products