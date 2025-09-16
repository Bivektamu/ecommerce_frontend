import { useMemo, useState } from 'react'
import { Order, Product, Review, User } from '../../store/types'
type DType = Product | Order | User | Review
const useSearch = (data: DType[]) => {
    const [params, setParams] = useState('')

    const filteredData = useMemo(() => {
        if (params && data.length > 0) {
            let args = 'email'
            const firstItem = data[0]
            if ((firstItem as Product).title) {
                args = 'title'
            }
            else if ((firstItem as Order).orderNumber) {
                args = 'orderNumber'
            }
            // @ts-ignore
            const filtered = data.filter((item) => (item[args]).toLowerCase().includes(params.toLowerCase()))


            return (filtered)


        }
        return data
    }, [params, data])


    return { filteredData, setParams, params }
}

export default useSearch