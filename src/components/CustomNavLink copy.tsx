// import { SetStateAction } from 'react'
import { MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

type Props = {
  to: string,
  state?: object,
  children: React.ReactNode,
  cssClass?: string,
  isNavLink?: boolean
  //   setShowNav?: SetStateAction<>
}

const CustomNavLink = ({ to, state, children, cssClass, isNavLink }: Props) => {

  const navigate = useNavigate()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const body = document.querySelector('body')
    body?.classList.add('opacity-0', 'transition', 'duration-200', 'overflow-hidden')

    setTimeout(() => {
      navigate(to)
    }, 200)

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      body?.classList.remove('opacity-0', 'overflow-hidden')
    }, 400)
  }

  console.log(state);
  

  return (
    <NavLink state={state || {}} className={({ isActive }) => `${(isActive && isNavLink) ? 'font-bold' : ''} ${cssClass}`} onClick={handleClick} to={to}>{children}</NavLink>
  )
}

export default CustomNavLink