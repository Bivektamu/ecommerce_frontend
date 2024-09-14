import React, { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Colour, Filters, Product, Size, Status } from '../store/types'
import TextLoader from './ui/TextLoader'
import CircleLoader from './ui/CircleLoader'
import SquareLoader from './ui/SquareLoader'
import getClasses from '../utils/getClasses'

const ALL_COLORS = [Colour.BLACK, Colour.RED, Colour.AMBER, Colour.GRAY, Colour.WHITE]
const ALL_SIZES = [Size.SMALL, Size.MEDIUM, Size.LARGE, Size.EXTRA_LARGE]

type Props = {
    products: Product[],
    status: Status,
    setFilters: Dispatch<SetStateAction<Filters>>,
    filters: Filters
}

const INIT_COLORS = {
    [Colour.BLACK]: false,
    [Colour.RED]: false,
    [Colour.AMBER]: false,
    [Colour.GRAY]: false,
    [Colour.WHITE]: false
}

const ProductFilter = ({ products, status, setFilters, filters }: Props) => {

    const [cats, setCats] = useState({})
    const [colrs, setColrs] = useState(INIT_COLORS)


    useEffect(() => {
        if (products.length > 0) {
            const categories = new Set(products.map((product: Product) => product.category))
            for (const cat of categories) {
                setCats((prev) => ({ ...prev, [cat]: false }))
            }
        }
    }, [products])

    useEffect(() => {
        const temp = { ...cats }

        if (Object.keys(temp).length > 0) {
            Object.keys(temp).map((key) => {
                temp[key] = false
            })
            filters.category.map(cat => temp[cat] = true)
            setCats({ ...temp })
        }


    }, [filters.category])


    useEffect(() => {
        const temp = { ...INIT_COLORS }

        filters.colors.map(col => temp[col] = true)
        setColrs({ ...temp })


    }, [filters.colors])


    // const categoryHandler = (e: MouseEvent<HTMLInputElement>) => {
    //     e.stopPropagation()

    //     if (e.target.checked) {
    //         setFilters((prev) => ({ ...prev, category: [...prev.category, e.target.name] }))
    //     }
    //     else {
    //         setFilters((prev) => ({ ...prev, category: prev.category.filter(cat => cat !== e.target.name) }))
    //     }
    // }


    const categoryHandler = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()


        if (e.target.checked) {
            setFilters((prev) => ({ ...prev, [e.target.name]: [...prev[e.target.name], e.target.value] }))
        }
        else {
            setFilters((prev) => ({ ...prev, [e.target.name]: prev[e.target.name].filter(cat => cat !== e.target.value) }))
        }
    }


    return (
        <div id="filters" className="py-8 px-5 rounded-md border w-1/4 shadow-lg">
            <div id="catgory-filter" className="mb-10">
                <p className="text-sm font-bold mb-4">Categories</p>
                {(status === Status.PENDING) ? <TextLoader col='3' cssClass="flex-col gap-4 w-1/3 ml-0" /> : cats.length < 1 ? <h2 className="text-sm text-slate-600 text-center">Sorry, there are no categories.</h2> :

                    Object.keys(cats).map((key, i) =>
                        <div key={i} className="flex gap-2 border-b py-4">
                            <input type="checkbox" name='category' value={key} id={key} checked={cats[key]} onChange={categoryHandler} />
                            <label htmlFor={key} className="capitalize text-sm text-slate-600 font-medium">{key}</label>
                        </div>
                    )
                }
            </div>

            <div id="colour-filter" className="mb-10">
                <p className="text-sm font-bold mb-6">Colour</p>
                {(status === Status.PENDING) ? <CircleLoader /> : products.length < 1 ? <h2 className="text-sm text-slate-600 text-center">Sorry, there are no colors available.</h2> :
                    <div className="flex gap-3 items-center">

                        {
                            Object.keys(colrs).map((color: Colour, i) => {

                                const { bgClass, borderClass } = getClasses(color)


                                return (
                                    <fieldset key={i}>
                                        <input type="checkbox" checked={colrs[color]} id={color} name="colors" value={color} onChange={categoryHandler} className='appearance-none hidden ' />

                                        <label htmlFor={color} className={`block w-8 h-8 rounded-full ${bgClass}  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full  after:absolute after:top-0 after:bottom-0 after:-right-1  after:m-auto  ${colrs[color] ? `after:${borderClass} after:border-2` : ''}`}></label>
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
                            ALL_SIZES.map((size: Size, i) => {
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