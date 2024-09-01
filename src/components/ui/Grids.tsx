import React from 'react'
type Props = {
    children: React.ReactNode
}

const Grids = ({children}: Props) => {
    return (
        <div>
            Grids
            {children}
        </div>
    )
}

export default Grids