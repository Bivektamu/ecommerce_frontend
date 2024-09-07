import React from 'react'
import { Colour, Product, Size, Status } from '../store/types'
import TextLoader from './ui/TextLoader'
import CircleLoader from './ui/CircleLoader'
import SquareLoader from './ui/SquareLoader'

const COLORS = [Colour.BLACK, Colour.RED, Colour.AMBER, Colour.GRAY, Colour.WHITE]
const SIZES = [Size.SMALL, Size.MEDIUM, Size.LARGE, Size.EXTRA_LARGE]

const getClasses = (colour: Colour) => {
    let bgClass = '', borderClass = ''
    switch (colour) {
        case Colour.BLACK:
            bgClass = 'bg-black'
            borderClass = 'border-black'
            break;
        case Colour.RED:
            bgClass = 'bg-red-600'
            borderClass = 'border-red-600'
            break;
        case Colour.AMBER:
            bgClass = 'bg-amber-300'
            borderClass = 'border-amber-300'
            break;
        case Colour.GRAY:
            bgClass = 'bg-gray-600'
            borderClass = 'border-gray-600'
            break;
        case Colour.WHITE:
            bgClass = 'bg-regal-white'
            borderClass = 'border-regal-white'
            break;

        default:
            break;
    }

    return {
        bgClass,
        borderClass
    }
}

type Props = {
    products: Product[],
    status: Status
}


const ProductFilter = ({ products, status }: Props) => {
    return (
        <div id="filters" className="py-8 px-5 rounded-md border w-1/4 shadow-lg">
            <div id="catgory-filter" className="mb-10">
                <p className="text-sm font-bold mb-4">Categories</p>
                {(status === Status.PENDING) ? <TextLoader col='3' cssClass="flex-col gap-4 w-1/3 ml-0" /> : products.length < 1 ? <h2 className="text-sm text-slate-600 text-center">Sorry, there are no categories.</h2> :

                    products.map((product: Product) =>
                        <div key={product.id} className="flex gap-2 border-b py-4">
                            <input type="checkbox" name={product.category} id={product.category} /><label htmlFor={product.category} className="capitalize text-sm text-slate-600 font-medium">{product.category}</label>
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
                                    <>
                                        <label htmlFor="white" className={`w-8 h-8 rounded-full ${bgClass}  cursor-pointer relative after:content-[""] after:w-10 after:h-10 after:rounded-full  after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto '}`}></label>
                                        <input type="checkbox" id={color} name="colors" value={color} className='appearance-none hidden ' />
                                    </>
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