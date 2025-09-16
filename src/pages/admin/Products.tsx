import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreDispatch } from '../../store'
import { getProducts, useProduct } from '../../store/slices/productSlice'

import { Action, Product, Status, Toast, Toast_Vairant } from '../../store/types'
import { v4 as uuidv4 } from 'uuid';
import { addToast } from '../../store/slices/toastSlice'
import SearchIcon from '../../components/ui/SearchIcons'
import ProgressLoader from '../../components/ui/ProgressLoader'
import ProductTile from '../../components/admin/ProductTile'
import useSearch from '../../components/hooks/useSearch'


const Products = () => {

  const dispatch = useStoreDispatch()

  const { products, status, action } = useProduct()

  const {filteredData, setParams, params} = useSearch(products)

  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(getProducts())
    }
  }, [])



  useEffect(() => {
    if (action) {

      let variant: Toast_Vairant = '' as Toast_Vairant, msg = ''
      switch (action) {
        case Action.EDIT:
          msg = 'Product updated successfully.'
          variant = Toast_Vairant.SUCCESS
          break;

        case Action.ADD:
          msg = 'Product added successfully.'
          variant = Toast_Vairant.SUCCESS
          break;

        case Action.DELETE:
          variant = Toast_Vairant.SUCCESS,
            msg = 'Product deleted successfully.'
          break;

        default:
          break;
      }

      if (variant) {
        const newToast: Toast = {
          id: uuidv4(),
          variant,
          msg
        }
        dispatch(addToast(newToast))
      }
    }

    dispatch(getProducts())

  }, [action])


  if (status == Status.IDLE || status == Status.PENDING) {
    return <ProgressLoader />
  }

  if (status === Status.FULFILLED && action !== Action.FETCH) {
    return <ProgressLoader />
  }

  return (

    <div className='bg-white rounded-lg'>
      <div className="flex justify-between p-8 items-center">
        <p className="font-semibold">Products</p>
        <div className="flex gap-x-4 ">

          <div className='relative'>
            <SearchIcon />

            <input 
            type='text'
             className='text-black py-2 px-4 rounded cursor-pointer border-slate-400 border-[1px] text-sm text-left outline-none pl-10'
              value={params} 
              placeholder='Search products'
              onChange={(e)=>setParams(e.target.value)}
              />
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

        {filteredData && filteredData.length > 0 && (filteredData as Product[]).map(product =>
          <ProductTile key={product.id} product={product} />
        )}

      </div>

    </div>
  )
}

export default Products