// import React, { useState } from 'react'
import OrderTile from '../../components/admin/OrderTile'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from '../../data/query'
import { stripTypename } from '@apollo/client/utilities'
import { Order } from '../../store/types'
import ProgressLoader from '../../components/ui/ProgressLoader'

const Orders = () => {

    const {data, loading, error} = useQuery(GET_ORDERS)

    // if(error) {
    //     console.log(error)
    // }



    if(loading) {
        return <ProgressLoader />
    }

    const orders = stripTypename(data.orders)
    // const [actionId, setActionId] = useState('')

    console.log(orders)

    return (

        <div className='bg-white rounded-lg'>
            <div className="flex justify-between p-8 items-center">
                <p className="font-semibold">Orders</p>
                <button className='border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm'>Filter by</button>
            </div>


            <div className='grid grid-cols-table-order gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] mb-6'>
                
                <span className='text-sm text-slate-500 font-medium '>
                    Order Number
                </span>
                <span className='text-sm text-slate-500 font-medium '>
                    Items
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Date
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Total
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Status
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Details
                </span>

                <span className='text-sm text-slate-500 font-medium'>
                    Action
                </span>
            </div>

            {
                orders.length < 1 ?
                    <p className='px-8 py-8 text-slate-500'>There are no Orders yet.</p>
                    :
                    <div className="w-full">
                        {
                            orders.map((order:Order) =>
                                <OrderTile key={order.id} order={order} />
                            )
                        }
                    </div>

            }


        </div>
    )
}

export default Orders