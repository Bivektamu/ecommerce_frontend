import React, { MouseEvent, act, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Close from '../../components/ui/Close'
import { useStoreDispatch } from '../../store'
import { deleteProduct, getProducts, useProduct } from '../../store/slices/productSlice'
import { useSelector } from 'react-redux'
import Preloader from '../../components/ui/Preloader'
import { Action, Product, Status, Toast, Toast_Vairant } from '../../store/types'
import Check from '../../components/ui/Check'
import { v4 as uuidv4 } from 'uuid';
import { addToast } from '../../store/slices/toastSlice'
import Modal from '../../components/ui/Modal'
import SearchIcon from '../../components/ui/SearchIcons'


const Products = () => {

  const dispatch = useStoreDispatch()

  const { products, status, action } = useSelector(useProduct)

  const [actionId, setActionId] = useState('')
  const [modalContent, setModalContent] = useState<ReactElement | null>(null)

  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    dispatch(getProducts())
  }, [])


  useEffect(() => {
    if (action) {
      console.log(action);

      let variant = '', msg = ''
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
          variant = Toast_Vairant.DANGER,
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

  useEffect(() => {
    if (modalContent) {
      setShowModal(true)
    }
  }, [modalContent])


  const deleteProductFunc = (id: string) => {
    setShowModal(false)
    setModalContent(null)
    dispatch(deleteProduct(id))
  }

  const openDeleteProductHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    const content = (
      <div className='text-center'>
        <p className="mb-6 font-medium text-sm">Are you sure you want to delete this product?</p>
        <div className="flex gap-x-4 justify-center">
          <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={e => closeModal(e)}>Cancel</button>
          <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={() => deleteProductFunc(id)}>Delete</button>
        </div>
      </div>
    )

    setModalContent(content)

  }

  const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowModal(false)
    setModalContent(null)
  }

  if (status == Status.IDLE || status == Status.PENDING) {
    return <Preloader />
  }

  if (status === Status.FULFILLED && action !== Action.FETCH) {
    console.log('okokokok');

    return <Preloader />
  }



  return (

    <div className='bg-white rounded-lg'>
      <div className="flex justify-between p-8 items-center">
        <p className="font-semibold">Products</p>
        <div className="flex gap-x-4 ">

          <div className='relative'>
          <SearchIcon />

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

            <span className='text-sm text-slate-500 capitalize'>
              {product.category}
            </span>


            <span className='relative'>
              {product.featured ? <Check classN='' /> : <Close classN='w-4 bg-black' />}
            </span>


            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
              <button onClick={() => setActionId(product.id)} >...</button>
              {actionId === product.id &&
                <div className='absolute bg-white border-[1px] rounded-lg shadow w-[100px]  -translate-x-[55px] translate-y-[45px]' onMouseLeave={() => setActionId('')}>
                  <Link className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2' to={`/admin/products/${product.slug}`}>Edit</Link>

                  <button className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-2 pb-4' onClick={e => openDeleteProductHandler(e, product.id)} >Delete</button>
                </div>
              }

            </div>

          </div>
        )}

      </div>



      {
        showModal && <Modal close={closeModal}>
          {modalContent!}
        </Modal>
      }

    </div>
  )
}

export default Products