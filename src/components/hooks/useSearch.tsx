import { useMemo, useState } from 'react'
import { DetailedReview, Order, Product, User } from '../../store/types'
type DType = Product | Order | User | DetailedReview
const useSearch = (data: DType[]) => {
    const [params, setParams] = useState('')

    const filteredData = useMemo(() => {
        if (params && data.length > 0) {
            // @ts-ignore
            let filtered = []
            const firstItem = data[0]
            if ((firstItem as Product).title) {
                filtered = (data as Product[]).filter(item => item.title.toLowerCase().includes(params.toLowerCase()))
            }
            else if ((firstItem as Order).orderNumber) {
                filtered = (data as Order[]).filter(item => (item.orderNumber as unknown as string).toLowerCase().includes(params.toLowerCase()))
            }
            else if ((firstItem as User).firstName) {
                filtered = (data as User[]).filter(item => (item.firstName + item.lastName + item.email).toLowerCase().includes(params.toLowerCase()))
            }
            else {
                filtered = (data as DetailedReview[]).filter(item => (item.userId.firstName + item.userId.lastName + item.productId.title).toLowerCase().includes(params.toLowerCase()))
            }

            // @ts-ignore
            return filtered
        }

        return data
    }, [params, data])


    return { filteredData, setParams, params }
}

export default useSearch