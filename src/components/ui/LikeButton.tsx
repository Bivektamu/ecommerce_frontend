import { useMutation, useQuery } from '@apollo/client'
import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { GET_WISH_LIST_BY_USER_ID } from '../../data/query'
import { useAuth } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'
import { LikedProduct, WishList } from '../../store/types'
import { stripTypename } from '@apollo/client/utilities'
import { ADD_TO_WISH_LIST } from '../../data/mutation'
import SquareLoader from './SquareLoader'

type Props = {
    productId: string
}

const LikeButton = ({ productId }: Props) => {
    const [isLiked, setIsLiked] = useState(false)
    const [products, setProducts] = useState<LikedProduct[]>([])
    const { user } = useSelector(useAuth)

    const [addToWishList] = useMutation(ADD_TO_WISH_LIST)


    const { data, loading } = useQuery(GET_WISH_LIST_BY_USER_ID, {
        variables: {
            userId: user?.id
        }
    })

    const wishList: WishList = useMemo(() => {
        if (!data) return {}
        return stripTypename(data.wishListByUserId)

    }, [data])

    useEffect(() => {
        if (Object.keys(wishList).length > 0) {
            setProducts(wishList.products)
        }
    }, [wishList])

    useEffect(() => {
        if (products.length > 0) {
            const productAlreadyLiked = products.some(item => item.id === productId)
            if (productAlreadyLiked) {
                setIsLiked(true)
            }
        }

        console.log(products)

    }, [products])


    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let toUpdateProducts = products

        if (isLiked) {
            toUpdateProducts = products.filter(item => item.id !== productId)
        }
        else {
            toUpdateProducts = [...products, { id: productId }]
        }

        console.log(toUpdateProducts)

        addToWishList({
            variables: {
                input: {
                    products: toUpdateProducts,
                    userId: user?.id
                }
            }
        })

        setIsLiked(!isLiked)
    }

    if(loading) {
        return <SquareLoader square={1} squareClass='ml-8 inline-block' />
    }

    return (
        <button type="button" className='ml-8' onClick={clickHandler}>
            {
                isLiked ?
                    <FaHeart className='w-5 h-5 relative top-1' />
                    :
                    <FaRegHeart className='w-5 h-5 relative top-1' />
            }
        </button>
    )
}

export default LikeButton