import { useEffect, useMemo } from 'react'
import { getProducts, useProduct } from '../../../store/slices/productSlice'
import { Status } from '../../../store/types'
import { useStoreDispatch } from '../../../store'

type Props = {
    id: string
}

const ProductTitle = ({ id }: Props) => {

    const { status, products } = useProduct()
    const dispatch = useStoreDispatch()

    useEffect(() => {
        if (status === Status.IDLE) {
            dispatch(getProducts())
        }
    }, [status, dispatch])


    const title: string = useMemo(() => {
        if (products && products.length > 0) {
            const tempTitle:string = products.find(item => item.id === id)?.title || ''

            return tempTitle
        
        }
        return ''
    }, [products, id])

    return <>{title}</>

}

export default ProductTitle