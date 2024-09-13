
import Grids from "../components/ui/Grids"
import { getProducts, useProduct } from "../store/slices/productSlice"
import { MouseEvent, useEffect, useState } from "react"
import { useStoreDispatch } from "../store"
import { useSelector } from "react-redux"
import BreadCrumbs from "../components/ui/BreadCrumbs"
import { Filters, Status } from "../store/types"
import ProductFilter from "../components/ProductFilter"
import Close from "../components/ui/Close"
import GridLoader from "../components/ui/GridLoader"
import { Link } from "react-router-dom"
import ProductCard from "../components/ui/ProductCard"


const Collections = () => {
  const dispatch = useStoreDispatch()
  const { products, status } = useSelector(useProduct)

  const [filters, setFilters] = useState<Filters>({
    category: []
  })

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    console.log(filters);

  }, [filters])

  const clickHandlerCat = (e: MouseEvent<HTMLButtonElement>, cat: string) => {
    e.stopPropagation()
    setFilters(prev => ({ ...prev, category: prev.category.filter(c => c !== cat) }))
  }


  const { category } = filters

  return (
    <>
      <section id="breadcrums" className="">
        <div className="py-8 container mx-auto">
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto py-8 flex gap-16 items-start">
          <ProductFilter products={products} status={status} updateFilters={setFilters} />
          <div id="filtered-products" className="py-8 px-5  w-3/4 ">
            <p className="text-sm font-bold mb-4">Applied Filters:</p>
            <div className="flex gap-4 mb-8 flex-wrap">
              {
                category.map((cat, i) =>
                  <p key={i} className="text-xs font-semibold flex gap-2 items-center capitalize text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px] ">
                    {cat}
                    <button type="button" onClick={(e) => clickHandlerCat(e, cat)}>
                      <Close classN="w-3 bg-slate-600" />
                    </button>
                  </p>)
              }

              <p className="text-xs font-semibold flex gap-2 items-center capitalize text-black border-slate-300 border-[1px] py-[5px] px-6 rounded-[20px] ">Size: M <button type="button"><Close classN="w-3 bg-slate-600" /></button></p>
            </div>

            <div className="flex justify-between mb-8">
              <p className="text-xs text-slate-400 font-medium">Showing 1-9 of 36 results.</p>
              <div className="">
                <p className="text-xs text-slate-600 uppercase font-semibold tracking-wider flex gap-2 items-center">sort by <span className="w-2 h-2 border-b-2 border-r-2 rotate-45 border-slate-600 -translate-y-[2px]"></span></p>
              </div>
            </div>

            <div className="w-full mb-12">

              {(status === Status.PENDING) ? <GridLoader col='3' /> : products.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no products.</h2> :

                <Grids cssClass='container mx-auto grid-cols-3 grid gap-x-12 gap-y-16'>
                  {
                    products.map(product =>
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