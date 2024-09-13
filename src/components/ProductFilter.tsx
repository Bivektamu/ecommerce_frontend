import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'
import { Colour, Filters, Product, Size, Status } from '../store/types'
import TextLoader from './ui/TextLoader'
import CircleLoader from './ui/CircleLoader'
import SquareLoader from './ui/SquareLoader'
import getClasses from '../utils/getClasses'

const COLORS = [Colour.BLACK, Colour.RED, Colour.AMBER, Colour.GRAY, Colour.WHITE]
const SIZES = [Size.SMALL, Size.MEDIUM, Size.LARGE, Size.EXTRA_LARGE]

type Props = {
    products: Product[],
    status: Status,
    updateFilters: Dispatch<SetStateAction<Filters>>
}


const ProductFilter = ({ products, status, updateFilters }: Props) => {

    const [cats, setCats] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const categories = new Set(products.map((product: Product) => product.category))
            setCats([...Array.from(categories)])
        }
    }, [products])


    const categoryHandler = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()

        if (e.target.checked) {
            updateFilters((prev) => ({ ...prev, category: [...prev.category, e.target.name] }))
        }
        else {
            updateFilters((prev)=>({...prev, category: prev.category.filter(cat=>cat!==e.target.name)}))
        }
    }

    return (
        <div id="filters" className="py-8 px-5 rounded-md border w-1/4 shadow-lg">
            <div id="catgory-filter" className="mb-10">
                <p className="text-sm font-bold mb-4">Categories</p>
                {(status === Status.PENDING) ? <TextLoader col='3' cssClass="flex-col gap-4 w-1/3 ml-0" /> : cats.length < 1 ? <h2 className="text-sm text-slate-600 text-center">Sorry, there are no categories.</h2> :

                    cats.map((cat, i) =>
                        <div key={i} className="flex gap-2 border-b py-4">
                            <input type="checkbox" name={cat} id={cat} onClick={categoryHandler} /><label htmlFor={cat} className="capitalize text-sm text-slate-600 font-medium">{cat}</label>
                        </div>
                    )
                }
            </div>

            <div id="colour-filter" className="mb-10">
                <p className="text-sm font-bold mb-6">Colour</p>
                {(status === Status.PENDING) ? <CircleLoader /> : products.length < 1 ? <h2 className="text-sm text-slate-600 text-center">Sorry, there are no colors available.</h2> :
                    <div className="flex gap-4 items-center">

                        {
                            COLORS.map((color: Colour, i) => {

                                const { bgClass } = getClasses(color)


                                return (
                                    <fieldset key={i}>
                                        <label htmlFor="white" className={`w-8 h-8 rounded-full ${bgClass}  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full  after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto '}`}></label>
                                        <input type="checkbox" id={color} name="colors" value={color} className='appearance-none hidden ' />
                                    </fieldset>
                                )
                            })
                        }
                    </div>
                }
            </div>

            <div id="size-filter" className="mb-10">
                <p className="text-sm font-bold mb-6">Size</p>
                {(status === Status.PENDING) ? <SquareLoader square={4} /> : products.length < 1 ? <h2 className="text-sm text-slate-600 text-center">Sorry, there are no sizes available.</h2> :
                    <div className="flex gap-4 items-center">

                        {
                            SIZES.map((size: Size, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" name="sizes" id={Size.SMALL} value={Size.SMALL} className='appearance-none hidden' />

                                        <label htmlFor={size} className={`w-8 block flex items-center justify-center h-8 text-sm font-medium rounded cursor-pointer border-[1px]`}>{size === Size.EXTRA_LARGE ? 'XL' : size[0]}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

            <div id="price-filter" className="mb-10">
                <p className="text-sm font-bold mb-6">Price</p>

                <div className="flex gap-4 items-center">
                    {status === Status.PENDING ? <SquareLoader square={1} squareClass='min-w-12' /> :

                        <input type="number" name="minPrice" placeholder='Min' className="min-w-12 text-center  items-center h-12  text-sm text-slate-600 font-medium rounded cursor-pointer border-[1px]" />
                    }
                    <span className="text-2xl font-medium text-slate-600" >-</span>
                    {status === Status.PENDING ? <SquareLoader square={1} squareClass='min-w-12' /> :

                        <input type="number" name="maxPrice" placeholder="Max" className="min-w-12 text-center  items-center h-12  text-sm text-slate-600 font-medium rounded cursor-pointer border-[1px]" />
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductFilter