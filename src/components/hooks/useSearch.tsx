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
            else if ((firstItem as User).email) {
                args = 'email'
            }

            // @ts-ignore
            let filtered = data.filter(item => item[args].toLowerCase().includes(params.toLowerCase()))


            if (args === 'orderNumber') {
                // @ts-ignore
                filtered = data.filter(item => item[args].toLowerCase().indexOf(params.toLowerCase()) === 0)
            }

            return filtered
        }

        return data
    }, [params, data])


    return { filteredData, setParams, params }
}

export default useSearch