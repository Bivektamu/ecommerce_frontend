import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Products = (props: Props) => {

  const [actionId, setActionId] = useState('')
  return (
    <section className="w-full pl-[340px] pb-12 pr-12">
      <div className="h-[72px] flex items-center gap-x-2 text-slate-700 mb-12">
        <Link to="/admin" className='text-sm font-medium '>Admin</Link> &gt; <span className='text-sm font-semibold text-black'>Products</span>
      </div>
      <div className='bg-white rounded-lg'>
        <div className="flex justify-between p-8 items-center">
          <p className="font-semibold">Products</p>
          <div className="flex gap-x-4 ">

            <div className='relative'>
              <svg className='absolute top-0 bottom-0 m-auto left-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.2252 18.4799C13.28 18.4799 15.2507 17.6636 16.7036 16.2106C18.1566 14.7577 18.9729 12.787 18.9729 10.7322C18.9729 8.67737 18.1566 6.70672 16.7036 5.25374C15.2507 3.80077 13.28 2.9845 11.2252 2.9845C9.17038 2.9845 7.19973 3.80077 5.74675 5.25374C4.29378 6.70672 3.47751 8.67737 3.47751 10.7322C3.47751 12.787 4.29378 14.7577 5.74675 16.2106C7.19973 17.6636 9.17038 18.4799 11.2252 18.4799Z" stroke="#5C5F6A" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5225 21.0155L16.5782 17.0712" stroke="#5C5F6A" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input type='text' className='text-black py-2 px-4 rounded cursor-pointer border-slate-400 border-[1px] text-sm text-left outline-none pl-10' value={''} placeholder='Search products' />
            </div>

            <Link to="/admin/products/add" className='bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm'>Add Product</Link>
          </div>
        </div>



        <div className='grid grid-cols-table px-8 py-4 border-t-[1px] border-b-[1px] mb-6'>
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
            Action
          </span>
        </div>

        {/* <p className='px-8 py-8 text-slate-500'>There are no products. Please add new product.</p> */}

        <div className="w-full">
          
          <div className='grid grid-cols-table px-8 py-4 border-b-[1px] items-center gap-x-4'>
            <Link to='/prodcts/asdf23'>
              <img src="https://zwgxcetfcxbhggokckkn.supabase.co/storage/v1/object/public/ecommerce/sleek-cozy-black.png" />
            </Link>
            <Link to='/prodcts/asdf23' className='text-sm text-slate-500'>Sleek and Cozy Black</Link>
            <span className='text-sm text-slate-500'>
              WVT002
            </span>

            <span className='text-sm text-slate-500'>
              $67.00
            </span>

            <span className='text-sm text-slate-500'>
              In Stock
            </span>

            <span className='text-sm text-slate-500'>
              Hoodies
            </span>

            <div className='text-lg text-slate-500 font-semibold relative'>
              <button onClick={()=>setActionId('id1')} >...</button>
              {actionId==='id1' &&
                <div className='absolute bg-white border-[1px] rounded-lg shadow w-[100px]  -translate-x-[100px]' onMouseLeave={()=>setActionId('')}>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pt-4'>View</button>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2'>Edit</button>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pb-4'>Delete</button>
                </div>
              }

            </div>
            
          </div>

          <div className='grid grid-cols-table px-8 py-4 border-b-[1px] items-center gap-x-4'>
            <Link to='/prodcts/asdf23'>
              <img src="https://zwgxcetfcxbhggokckkn.supabase.co/storage/v1/object/public/ecommerce/sleek-cozy-black.png" />
            </Link>
            <Link to='/prodcts/asdf23' className='text-sm text-slate-500'>Sleek and Cozy Black</Link>
            <span className='text-sm text-slate-500'>
              WVT002
            </span>

            <span className='text-sm text-slate-500'>
              $67.00
            </span>

            <span className='text-sm text-slate-500'>
              In Stock
            </span>

            <span className='text-sm text-slate-500'>
              Hoodies
            </span>

            <div className='text-lg text-slate-500 font-semibold relative'>
              <button onClick={()=>setActionId('id2')} >...</button>
              {actionId==='id2' &&
                <div className='absolute bg-white border-[1px] rounded-lg shadow w-[100px]  -translate-x-[100px]' onMouseLeave={()=>setActionId('')}>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pt-4'>View</button>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2'>Edit</button>
                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pb-4'>Delete</button>
                </div>
              }

            </div>
            
          </div>

        </div>

      </div>

    </section>
  )
}

export default Products