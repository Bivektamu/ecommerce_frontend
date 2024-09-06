import React from 'react'
import Grids from './Grids';

type Props = {
    col: string,
    cssClass: string
}

const TextLoader = ({ col, cssClass }: Props) => {
    console.log(typeof (col));

    return (
        <div className={`container mx-auto flex ${cssClass}`}>
            {
                new Array(parseInt(col)).fill('*').map((_, i) => <p key={i} className='w-full bg-slate-200 animate-pulse h-2' />)
            }
        </div>

    )
}

export default TextLoader