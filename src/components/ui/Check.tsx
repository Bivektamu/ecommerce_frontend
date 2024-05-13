import React from 'react'

type Props = {
  classN?: string
}

const Close = ({ classN }: Props) => {
  return (
    <span className={`rotate-45 border-b-2 border-r-2 border-slate-600 -translate-x-1 inline-block ${classN}`}>
    </span>
  )
}

export default Close