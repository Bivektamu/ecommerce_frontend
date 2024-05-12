import React from 'react'

type Props = {
    variant?: string,
    title: string
}

const Tooltip = ({ variant = 'full', title = 'tooltip' }: Props) => {
    return (
        <div className={`text-xs capitalize absolute hidden group-hover:block  -top-4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-2 py-1 rounded ${variant === 'full' ? 'bg-slate-600 text-white ' : ''}`}>
            <span >{title}</span>
            <span className='w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600 absolute top-full left-0 right-0 m-auto'></span>
        </div>

    )
}

export default Tooltip