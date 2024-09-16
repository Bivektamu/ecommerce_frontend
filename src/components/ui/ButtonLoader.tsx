import React from 'react'
import Grids from './Grids';

type Props = {
    cssClass?: string
}

const ButtonLoader = ({ cssClass }: Props) => {
    return (
        <div className={` bg-slate-200 h-8 w-28  rounded-full animate-pulse ${cssClass}`}>
        </div>
    )
}

export default ButtonLoader