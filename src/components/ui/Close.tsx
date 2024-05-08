import React from 'react'

type Props = {
    classN?: string
}

const Close = ({classN}: Props) => {
  return (
    <span className={`flex m-auto items-center justify-center  relative after:content[""] after:w-full after:h-[2px] after:bg-slate-600 after:rotate-45 after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:absolute before:content[""] before:w-full before:h-[2px] before:bg-slate-600 before:-rotate-45 ${classN}`}>

    </span>
  )
}

export default Close