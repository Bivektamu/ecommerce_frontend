
import Grids from "../components/ui/Grids"
import { getProducts, useProduct } from "../store/slices/productSlice"
import { useEffect, useState } from "react"
import { useAdminDispatch } from "../store"
import { useSelector } from "react-redux"
import BreadCrumbs from "../components/ui/BreadCrumbs"
import { Colour, Product, Size, Status } from "../store/types"
import TextLoader from "../components/ui/TextLoader"
import ColourLoader from "../components/ui/ColourLoader"
import SquareLoader from "../components/ui/SquareLoader"

const COLORS = [Colour.BLACK, Colour.RED, Colour.AMBER, Colour.GRAY, Colour.WHITE]
const SIZES = [Size.SMALL, Size.MEDIUM, Size.LARGE, Size.EXTRA_LARGE]

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

  console.log(Colour);



  return (
    <>
      <section id="breadcrums" className="">
        <div className="py-8 container mx-auto">
          <BreadCrumbs rootLink="Ecommerce" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto py-8 flex gap-16">
          <div id="filters" className="py-8 px-5 rounded-md border w-1/4">
            <div id="catgory-filter" className="mb-10">
              <p className="text-sm font-bold mb-4">Categories</p>
              {(status === Status.PENDING) ? <TextLoader col='3' cssClass="flex-col gap-4 w-1/3 ml-0" /> : products.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no categories.</h2> :

                products.map((product: Product) =>
                  <div key={product.id} className="flex gap-2 border-b py-4">
                    <input type="checkbox" name={product.category} id={product.category} /><label htmlFor={product.category} className="capitalize text-sm text-slate-600 font-medium">{product.category}</label>
                  </div>
                )
              }

            </div>
            <div id="colour-filter" className="mb-10">
              <p className="text-sm font-bold mb-6">Colour</p>
              {(status === Status.PENDING) ? <ColourLoader /> : products.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no colors available.</h2> :
                <div className="flex gap-4 items-center">

                  {
                    COLORS.map((color: Colour, i) => {

                      const bg = `bg-${color === Colour.WHITE ? 'regal-white' : color.toLocaleLowerCase() + '-'}${color === Colour.WHITE || color === Colour.BLACK ? '' : color === Colour.AMBER ? '300' : '600'}`
                      const border = `after:border-${color.toLocaleLowerCase() + '-'}${color === Colour.WHITE ? '' : color === Colour.AMBER ? '300' : '600'}`
                      return (
                        <>
                          <label htmlFor="white" className={`w-8 h-8 rounded-full ${bg}  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full after:border-2 ${border} after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:-translate-x-1'}`}></label>
                          <input type="checkbox" id={color} name="colors" value={color} className='appearance-none hidden ' />
                        </>
                      )
                    })
                  }
                </div>
              }
            </div>

            <div id="size-filter">
              <p className="text-sm font-bold mb-6">Size</p>
              {(status === Status.PENDING) ? <SquareLoader /> : products.length < 1 ? <h2 className="text-lg text-slate-600 text-center">Sorry, there are no sizes available.</h2> :
                <div className="flex gap-4 items-center">

                  {
                    SIZES.map((size: Size, i) => {
                      

                      return (
                        <div key={i}>
                          {/* <input type="checkbox" onChange={changeHandler} name="sizes" id="small" value={Size.SMALL} className='appearance-none hidden' /> */}

                          <label htmlFor={size} className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px]`}>{size === Size.EXTRA_LARGE?'XL':size[0]}</label>
                        </div>
                      )
                    })
                  }
                </div>
              }
            </div>
            <div id="price-filter"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Collections