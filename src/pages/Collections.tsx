
import Grids from "../components/ui/Grids"
import { getProducts, useProduct } from "../store/slices/productSlice"
import { useEffect, useState } from "react"
import { useAdminDispatch } from "../store"
import { useSelector } from "react-redux"
import BreadCrumbs from "../components/ui/BreadCrumbs"
import { Colour, Product, Size, Status } from "../store/types"
import TextLoader from "../components/ui/TextLoader"
import CircleLoader from "../components/ui/CircleLoader"
import SquareLoader from "../components/ui/SquareLoader"
import ProductFilter from "../components/ProductFilter"


const Collections = () => {
  const dispatch = useAdminDispatch()
  const { products, status } = useSelector(useProduct)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      console.log(products);

    }
  }, [products])



  return (
    <>
      <section id="breadcrums" className="">
        <div className="py-8 container mx-auto">
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto py-8 flex gap-16">
          <ProductFilter products={products} status={status} />
          <div id="filtered-products" className="py-8 px-5 rounded-md border w-3/4 shadow-lg"></div>
        </div>
      </section>
    </>
  )
}

export default Collections