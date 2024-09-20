
import Grids from "../components/ui/Grids"
import { getProducts, useProduct } from "../store/slices/productSlice"
import { MouseEvent, useEffect, useState } from "react"
import { useStoreDispatch } from "../store"
import { useSelector } from "react-redux"
import BreadCrumbs from "../components/ui/BreadCrumbs"
import { Colour, Filters, Product, Status } from "../store/types"
import ProductFilter from "../components/ProductFilter"
import Close from "../components/ui/Close"
import GridLoader from "../components/ui/GridLoader"
import { Link } from "react-router-dom"
import ProductCard from "../components/ui/ProductCard"
import SortProducts from "../components/SortProducts"
import { resetCartAction, useCart } from "../store/slices/cartSlice"


const Collections = () => {
  const dispatch = useStoreDispatch()
  const { products, status } = useSelector(useProduct)
  const { action } = useSelector(useCart)


  const [filters, setFilters] = useState<Filters>({
    category: [],
    colors: [],
    sizes: [],
    price: { min: '', max: '' }
  })

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    if (action) {
        dispatch(resetCartAction())
    }
}, [action])


  useEffect(() => {
    let tempProduct: Product[] = []
    if (products.length > 0) {
      if (filters.category.length > 0) {
        filters.category.map(cat => {
          products.map(product => {
            if (product.category.indexOf(cat) === 0) tempProduct.push(product)
          })
        })
      }
      else {
        tempProduct = [...products]
      }

      if (filters.colors.length > 0) {
        const temp: Product[] = []
        filters.colors.map(col => {
          tempProduct.map(product => {
            if (product.colors.indexOf(col) > -1) temp.push(product)
          })
        })
        tempProduct = temp
      }

      if (filters.sizes.length > 0) {
        const temp: Product[] = []
        filters.sizes.map(size => {
          tempProduct.map(product => {
            if (product.sizes.indexOf(size) > -1) temp.push(product)
          })
        })
        tempProduct = temp
      }

      if (filters.price.min) {
        tempProduct = tempProduct.filter(product => product.price >= filters.price.min)
      }

      if (filters.price.max) {
        tempProduct = tempProduct.filter(product => product.price <= filters.price.max)
      }
    }
    setFilteredProducts(Array.from(new Set([...tempProduct])))

  }, [filters, products])

  const clickHandler = (e: MouseEvent<HTMLButtonElement>, type: string, item: string) => {
    e.stopPropagation()
    setFilters(prev => ({ ...prev, [type]: prev[type].filter(c => c !== item) }))
  }

  const priceHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setFilters(prev => ({ ...prev, price: { min: '', max: '' } }))
  }

  const { category, colors, sizes } = filters

  return (
    <>
      <section id="breadcrums" className="">
        <div className="py-8 container mx-auto">
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto py-8 flex gap-16 items-start">
          <ProductFilter products={products} status={status} setFilters={setFilters} filters={filters} />
          <div id="filtered-products" className="py-8 px-5  w-3/4 ">
            <p className="text-sm font-bold mb-4">Applied Filters:</p>
            <div className="flex gap-4 mb-8 flex-wrap">
              {
                category.map((cat, i) =>
                  <p key={i} className="text-xs font-semibold flex gap-2 items-center capitalize text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px] ">
                    {cat}
                    <button type="button" onClick={(e) => clickHandler(e, 'category', cat)}>
                      <Close classN="w-3 bg-slate-600" />
                    </button>
                  </p>)
              }

              {

                colors.length > 0 &&
                colors.map((clr, i) =>
                  <p key={i} className="text-xs font-semibold flex gap-2 items-center capitalize text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px] ">
                    Color: {clr.toLowerCase()}
                    <button type="button" onClick={e => clickHandler(e, 'colors', clr)}>
                      <Close classN="w-3 bg-slate-600" />
                    </button>
                  </p>

                )
              }

              {

                sizes.length > 0 &&
                sizes.map((size, i) =>
                  <p key={i} className="text-xs font-semibold flex gap-2 items-center capitalize text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px] ">
                    Size: {size}
                    <button type="button" onClick={e => clickHandler(e, 'sizes', size)}>
                      <Close classN="w-3 bg-slate-600" />
                    </button>
                  </p>

                )
              }

              {
                (filters.price.min || filters.price.max) &&
                <p className="text-xs font-semibold flex gap-2 items-center capitalize text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px] ">
                  Price: {filters.price.min ? filters.price.min : 0} - {filters.price.max ? filters.price.max : 'max'}
                  <button type="button" onClick={priceHandler}>
                    <Close classN="w-3 bg-slate-600" />
                  </button>
                </p>
              }

            </div>

            <div className="flex justify-between mb-8">
              {
                filteredProducts.length > 0 &&
                <p className="text-xs text-slate-400 font-medium">Showing {filteredProducts.length} results.</p>
              }
              <SortProducts products = {filteredProducts} sortProducts = {setFilteredProducts} />

            </div>

            <div className="w-full mb-12">

              {(status === Status.PENDING) ? <GridLoader col='3' /> : filteredProducts.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no products for given filters.</h2> :

                <Grids cssClass='container mx-auto grid-cols-3 grid gap-x-12 gap-y-16'>
                  {
                    filteredProducts.map(product =>
                      <ProductCard key={product.id} item={product} />
                    )
                  }
                </Grids>
              }
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Collections