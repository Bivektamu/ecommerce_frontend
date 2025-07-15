import { NavLink } from 'react-router-dom'

type Props = {
  to: string,
  state?: object,
  children: React.ReactNode,
  cssClass?: string,
  isNavLink?: boolean,
  isDisabled?: boolean
}

const CustomNavLink = ({ to, state, children, cssClass, isNavLink, isDisabled }: Props) => {

  // const navigate = useNavigate()

  // const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
  // e.preventDefault()
  // e.stopPropagation()

  // const body = document.querySelector('body')
  // body?.classList.add('opacity-0', 'transition', 'duration-200', 'overflow-hidden')

  // setTimeout(() => {
  //   navigate(to)
  // }, 200)

  // setTimeout(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant",
  //   });
  //   body?.classList.remove('opacity-0', 'overflow-hidden')
  // }, 400)
  // }

  if (isDisabled) {
    return (
      <span className={cssClass}>{children}</span>
    )
  }
  else
    return (
      <NavLink state={state || {}} className={({ isActive }) => `${(isActive && isNavLink) ? 'font-bold' : ''} ${cssClass}`} to={to}>{children}</NavLink>
    )
}

export default CustomNavLink