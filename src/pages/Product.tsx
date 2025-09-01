import { useEffect, useState } from 'react'
import BreadCrumbs from '../components/ui/BreadCrumbs'
import { useStoreDispatch } from '../store'

import { getProducts, useProduct } from '../store/slices/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Product, Status } from '../store/types'
import StarIcon from '../components/ui/StarIcon'
import Grids from '../components/ui/Grids'
import GridLoader from '../components/ui/GridLoader'
import AddToCartForm from '../components/forms/AddToCartForm'
import DetailsReviewsTab from '../components/product/DetailsReviewsTab'
import TextLoader from '../components/ui/TextLoader'
import ButtonLoader from '../components/ui/ButtonLoader'
import SquareLoader from '../components/ui/SquareLoader'
import ProductCard from '../components/ui/ProductCard'
import { getReviewsByProductId, useReviews } from '../store/slices/reviewSlice'
import { getAverageRating } from '../utils/helpers'
import PageWrapper from '../components/ui/PageWrapper'

const ProductComponent = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [productItem, setProductItem] = useState<null | Product>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const dispatch = useStoreDispatch()
  const { products, status } = useProduct()
  const { reviews } = useReviews()



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

  useEffect(() => {
    if (productItem) {


      dispatch(getReviewsByProductId(productItem.id))

      const tempProducts = products.filter(product => product.category === productItem.category && product.id !== productItem.id)
      if (tempProducts.length > 0) {
        setSimilarProducts(tempProducts)
      }
      else {
        setSimilarProducts(products.slice(0, 4))
      }
    }

  }, [productItem])



  return (
    <PageWrapper>
      <section id="breadcrums" className="bg-white">
        <div className="py-8 container mx-auto">
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto">

          <div className="flex gap-12 mb-32">
            <div className="basis-1/2 bg-cultured flex items-center justify-center">
              {!productItem ? <SquareLoader square={1} squareClass='w-full h-full' /> : <img src={productItem.imgs[0].url} alt="" className='w-3/5' />}
            </div>

            <div className="basis-1/2">
              <h2 className="text-3xl font-semibold mb-2">
                {!productItem ? <TextLoader col='1' cssClass='w-2/5 h-12 ml-0' /> : productItem.title}
              </h2>

              <div className="flex gap-4 items-center mb-6">
                {
                  reviews && reviews.length > 0 &&

                  <p className="bg-cultured text-slate-600 font-medium flex items-center gap-2 py-2 px-6 rounded-full text-xs">
                    <StarIcon />
                    {getAverageRating(reviews)} <span className="w-4 h-[2px] bg-slate-600"></span>
                    {reviews.length} Reviews
                  </p>
                }

                {
                  !productItem ? <ButtonLoader /> :
                    <p className="border-2 border-cultured text-slate-600 font-medium flex items-center gap-2 py-2 px-6 rounded-full text-xs uppercase">
                      {productItem?.stockStatus ? 'In' : 'Out of'} Stock
                    </p>
                }

              </div>

              <p className="text-xl font-semibold mb-8">${productItem?.price}</p>
              <AddToCartForm product={productItem} />
             

            </div>
          </div>

          <DetailsReviewsTab product={productItem} />


          <div className="pb-32">
            <h2 className="text-2xl mb-3">You might also like</h2>
            <p className="text-sm uppercase mb-16 text-slate-400  text-wider font-medium">SIMILAR PRODUCTS</p>

            {(status === Status.PENDING) ? <GridLoader col='4' /> : similarProducts.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no products.</h2> :

              <Grids cssClass='container mx-auto grid-cols-4 grid gap-x-12 gap-y-16'>
                {

                  similarProducts.map(product =>
                    <ProductCard key={product.id} item={product} />
                  )
                }
              </Grids>
            }

          </div>
        </div>

      </section>
    </PageWrapper>
  )
}

export default ProductComponent