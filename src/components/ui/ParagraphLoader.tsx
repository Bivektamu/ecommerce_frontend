import React from 'react'
import Grids from './Grids';

type Props = {
    col?: string,
    cssClass?: string
}

const ParagraphLoader = ({ col, cssClass }: Props) => {
    return (
        <div className={`grid gap-4 ${cssClass}`}>
            {
                new Array(parseInt(col)).fill('*').map((_, i) => 
                <p key={i} className='grid grid-cols-8 gap-4 justify-between flex-wrap'>
                    <span  className='col-span-2 bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-1 rounded bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-2 rounded bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-3 rounded bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-1 rounded bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-3 rounded bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-2 rounded bg-slate-200 animate-pulse h-5' />
                    <span  className='col-span-2 rounded bg-slate-200 animate-pulse h-5' />
                </p>
                )
            }
        </div>
    )
}

export default ParagraphLoader