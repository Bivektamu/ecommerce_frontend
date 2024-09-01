import React from 'react'
type Props = {
    children: React.ReactNode,
    cssClass:string
}

const Grids = ({children, cssClass}: Props) => {
    return (
        <div className={cssClass}>
            {children}
        </div>
    )
}

export default Grids