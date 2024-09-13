import { ChangeEvent, useEffect, useState } from 'react'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import { useStoreDispatch } from '../store'
import { useSelector } from 'react-redux'
import { getProducts, useProduct } from '../store/slices/productSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Colour, Product, Size, Status } from '../store/types'
import StarIcon from '../components/ui/StarIcon'
import CircleLoader from '../components/ui/CircleLoader'
import getClasses from '../utils/getClasses'
import Grids from '../components/ui/Grids'
import GridLoader from '../components/ui/GridLoader'
import Reviews from '../components/Reviews'

type Props = {}

const ProductComponent = (props: Props) => {

  const params = useParams()
  const navigate = useNavigate()

  const [productItem, setProductItem] = useState<null | Product>(null)
  const dispatch = useStoreDispatch()
  const { products, status } = useSelector(useProduct)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      const productExists = products.filter(product => product.slug === params.slug)
      if (productExists.length < 1) {
        navigate('/')
      }
      setProductItem(productExists[0])
    }
  }, [products, params.slug])


  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.stopPropagation()
    console.log('asdf');

  }

  console.log('asdf');


  return (
    <>
      <section id="breadcrums" className="bg-white">
        <div className="py-8 container mx-auto">
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto">

          <div className="flex gap-12 mb-32">
            <div className="basis-1/2 bg-cultured flex items-center justify-center">
              <img src={productItem?.imgs[0].url} alt="" className='w-2/5' />
            </div>

            <div className="basis-1/2">
              <h2 className="text-3xl font-semibold mb-2">{productItem?.title}</h2>

              <div className="flex gap-4 items-center mb-6">
                <p className="bg-cultured text-slate-600 font-medium flex items-center gap-2 py-2 px-6 rounded-full text-xs">
                  <StarIcon /> 4.2 <span className="w-4 h-[2px] bg-slate-600"></span>
                  54 Reviews
                </p>
                <p className="border-2 border-cultured text-slate-600 font-medium flex items-center gap-2 py-2 px-6 rounded-full text-xs uppercase">
                  {productItem?.stockStatus ? 'In' : 'Out of'} Stock
                </p>
              </div>

              <p className="text-xl font-semibold mb-8">${productItem?.price}</p>

              <div className="mb-8">
                <p className="text-sm mb-3 font-medium text-slate-500 uppercase text-wider">Availabe Colours</p>
                {(status === Status.PENDING) ? <CircleLoader /> :
                  <div className="flex gap-4 items-center">

                    {
                      productItem?.colors.map((color: Colour, i) => {

                        const { bgClass } = getClasses(color)

                        return (
                          <>
                            <label htmlFor={color} className={`w-8 h-8 rounded-full ${bgClass}  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full  after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto '}`}></label>
                            <input type="checkbox" id={color} name="colors" value={color} className='appearance-none hidden ' />
                          </>
                        )
                      })
                    }
                  </div>
                }
              </div>


              <fieldset className='mb-8'>
                <legend className='font-medium text-slate-600 text-sm block mb-2 w-full uppercase'>Select Size</legend>

                <div className="flex gap-4">
                  <input type="checkbox" onChange={changeHandler} name="sizes" id="small" value={Size.SMALL} className='appearance-none hidden' />
                  <label htmlFor="small" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${productItem?.sizes.indexOf(Size.SMALL) > -1 ? 'bg-slate-200' : ''}`}>S</label>


                  <input type="checkbox" onChange={changeHandler} name="sizes" id="medium" value={Size.MEDIUM} className='appearance-none hidden' />
                  <label htmlFor="medium" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${productItem?.sizes.indexOf(Size.MEDIUM) > -1 ? 'bg-slate-200' : ''}`}>M</label>


                  <input type="checkbox" onChange={changeHandler} name="sizes" id="large" value={Size.LARGE} className='appearance-none hidden' />
                  <label htmlFor="large" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${productItem?.sizes.indexOf(Size.LARGE) > -1 ? 'bg-slate-200' : ''}`}>L</label>

                  <input type="checkbox" onChange={changeHandler} name="sizes" id="extraLarge" value={Size.EXTRA_LARGE} className='appearance-none hidden' />
                  <label htmlFor="extraLarge" className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px] ${productItem?.sizes.indexOf(Size.EXTRA_LARGE) > -1 ? 'bg-slate-200' : ''}`}>XL</label>
                </div>
              </fieldset>

              <fieldset className='mb-8'>
                <label htmlFor="quantity" className='font-medium text-slate-600 text-sm block mb-2 w-full uppercase'>Quantity</label>
                <div className="flex items-center gap-4 w-min  justtify-start border-cultured border-[2px] rounded px-4 py-2">
                  <button type="button" className='w-6 h-6 relative'><span className='w-4 h-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span></button>
                  <input type="number" value={4} className='w-[50px] text-center outline-none ' />
                  <button type="button" className='w-6 h-6 relative'>
                    <span className='w-4 h-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                    <span className='h-4 w-[2px] bg-slate-600 absolute top-0 bottom-0 m-auto left-0 right-0'></span>
                  </button>

                </div>
              </fieldset>

              <button type="submit" className="w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer text-sm" >Add to Cart</button>

            </div>
          </div>

          <div className='flex gap-8  mb-32'>
            <div className="basis-1/4 mt-12">
              <button className='text-sm flex items-center w-full py-2 px-4 rounded gap-2 mb-2 bg-cultured font-semibold'><span className='relative bottom-1'>...</span> Details</button>
              <button className='text-sm flex items-center w-full py-2 px-4 rounded gap-2 text-slate-600 font-medium'><StarIcon /> Reviews</button>
            </div>

            <div className="basis-3/4">
              <div id="details-tab">
                <p className="font-semibold mb-6">Details</p>
                <p className="text-sm text-slate-600">{productItem?.description}</p>
              </div>

              {/* <Reviews /> */}

            </div>
          </div>

          <div className="pb-32">
            <h2 className="text-2xl mb-3">You might also like</h2>
            <p className="text-sm uppercase mb-16 text-slate-400  text-wider font-medium">SIMILAR PRODUCTS</p>

            {(status === Status.PENDING) ? <GridLoader col='4' /> : products.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no products.</h2> :

              <Grids cssClass='container mx-auto grid-cols-4 grid gap-x-12 gap-y-16'>
                {new Array(2).fill('*').map((_, index) =>
                  products.map(product =>
                    <div key={product.id}>
                      <Link to={`/collections/${product.slug}`} className="bg-cultured mb-8 justify-center flex items-center  aspect-[2/2.3]">
                        <img src={product.imgs[0].url} alt="" className="w-3/5" />
                      </Link>
                      <p className="font-semibold mb-4 text-sm">{product.title}</p>
                      <div className="flex gap-x-4 items-center">
                        {
                          product.stockStatus ? <span className="text-xs font-semibold flex items-center uppercase text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px]">in stock</span> : <span>out of stock</span>
                        }
                        <span className="text-slate-600 text-xs">${product.price}</span>
                      </div>
                    </div>
                  )
                )
                }
              </Grids>
            }

          </div>
        </div>

      </section>
    </>
  )
}

export default ProductComponent