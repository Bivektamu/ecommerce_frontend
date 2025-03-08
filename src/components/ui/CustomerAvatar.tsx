import { useEffect, useState } from 'react'
import gravatar from 'gravatar'

import client from '../../data/client'
import { GET_CUSTOMER_EMAIL } from '../../data/query'
import { Status } from '../../store/types'
import UserAvatar from './UserAvatar'
type Props = {
    id: string
}

const CustomerAvatar = ({ id }: Props) => {

    const [emailApi, setEmailApi] = useState({
        error: '',
        email: '',
        status: Status.PENDING
    })

    useEffect(() => {


        const getCustomerEmailFunc = async (id: string) => {
            const { error, data } = await client.query({
                query: GET_CUSTOMER_EMAIL,
                variables: { customerEmailId: id }
            })


            if (error) {
                setEmailApi({
                    error: error.message,
                    email: '',
                    status: Status.REJECTED
                })
            }

            setEmailApi({
                error: '',
                email: data.customerEmail,
                status: Status.FULFILLED
            })
        }
        if (id) {
            getCustomerEmailFunc(id)
        }

    }, [id])


    const { error, email } = emailApi


    if (error) {
        return <UserAvatar />
    }

    return (
        <img className='w-10 h-10 rounded-full block' src={gravatar.url(email, { s: '200', r: 'pg', d: 'mp' })} />
    )
}

export default CustomerAvatar