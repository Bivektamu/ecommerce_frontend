import React from 'react'

type Props = {
    clasN?:string
}

const Check = ({clasN='relative'}: Props) => {
  return (
    <span className={`flex m-auto items-center justify-center  relative after:content[""] after:w-full after:h-[2px] h-0 after:rotate-45 after:top-0 after:bottom-0 after:left-0 after:right-0 after:m-auto after:absolute before:content[""] before:w-full before:h-[2px] before:bg-inherit after:bg-inherit before:-rotate-45 ${clasN}`}>
    </span>
  )
}

export default Check