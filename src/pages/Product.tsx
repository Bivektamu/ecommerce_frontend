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
import AddToCartForm from '../components/AddToCartForm'

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
              <AddToCartForm product={productItem} />
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