import React, { Dispatch, useState } from 'react'
import Arrow from './ui/Arrow'
import { Product } from '../store/types'

type Props = {
    products: Product[],
    sortProducts: Dispatch<React.SetStateAction<Product[]>>
}

const SortProducts = ({ products, sortProducts }: Props) => {
    const [sortBy, setSortBy] = useState(false)

    // sortProducts([...products.sort((a,b)=>a.title.localeCompare(b.title))]);

    const sortHandler = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        e.stopPropagation()
        if (type === 'a') {
            sortProducts([...products.sort((a, b) => a.title.localeCompare(b.title))]);
        }
        else if (type === 'z') {
            sortProducts([...products.sort((a, b) => a.title.localeCompare(b.title)).reverse()]);
        }
        else if (type === 'min') {
            sortProducts([...products.sort((a, b) => b.price - a.price).reverse()]);
        }
        else if (type === 'max') {
            sortProducts([...products.sort((a, b) => a.price - b.price).reverse()]);
        }
    }

    return (
        <div className="relative">
            <button onClick={() => setSortBy(true)} className="text-xs text-slate-600 uppercase font-semibold tracking-wider flex gap-2 items-center">sort by <span className="w-2 h-2 border-b-2 border-r-2 rotate-45 border-slate-600 -translate-y-[2px]" ></span></button>

            <div className={`absolute top-6 left-0 bg-white min-w-full rounded shadow-md z-10 flex flex-col ${sortBy ? '' : 'hidden'}`} onMouseLeave={() => setSortBy(false)}>
                <button className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between' onClick={e => sortHandler(e, 'a')}>
                    Title <Arrow cssClass='-rotate-90 w-[10px]' fillColor='#0E1422' />
                </button>

                <button className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between' onClick={e => sortHandler(e, 'z')}>
                    Title <Arrow cssClass='rotate-90 w-[10px]' fillColor='#0E1422' />
                </button>

                <button className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between' onClick={e => sortHandler(e, 'min')}>
                    Price <Arrow cssClass='-rotate-90 w-[10px]' fillColor='#0E1422' />
                </button>

                <button className='block min-w-full flex gap-2 text-xs font-normal text-left hover:bg-slate-100 px-2 py-2 items-center justify-between' onClick={e => sortHandler(e, 'max')}>
                    Price <Arrow cssClass='rotate-90 w-[10px]' fillColor='#0E1422' />
                </button>
            </div>
        </div>
    )
}

export default SortProducts