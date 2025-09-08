import { ReactNode, useMemo, useState } from "react"
import gravatar from 'gravatar'
import AvatarPlaceholder from "../ui/AvatarPlaceholder"

const useAvatar = () => {
    const [avatarEmail, setAvatarEmail] = useState('')

    const avatar:ReactNode = useMemo(() => {
        return  avatarEmail ?

            <img className='w-7 h-7 rounded-full' src={gravatar.url(avatarEmail, { s: '200', r: 'pg', d: 'mp' })} />

            : <AvatarPlaceholder />
    }, [avatarEmail])



    return { setAvatarEmail, avatar }

}

export default useAvatar