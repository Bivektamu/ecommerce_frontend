import { MouseEvent, ReactElement, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Order, Order_Status, Toast, Toast_Vairant } from '../../store/types'
import getMonth from '../../utils/getMonth'
import Modal from '../ui/Modal'
import OrderDetails from './OrderDetails';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/slices/toastSlice';

type Props = {
    order: Order
}

const OrderTile = ({ order }: Props) => {
    const dispatch = useDispatch()
    const [actionId, setActionId] = useState('')
    // const [product, setProduct] = useState({})
    const [newStatus, setNewStatus] = useState<Order_Status | null>(null)
    const [modalContent, setModalContent] = useState<ReactElement | null>(null)
    const [showModal, setShowModal] = useState(false)
    // const [showToast, setShowToast] = useState(false)

    const saveHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        console.log(id);
        
        if (!newStatus) {
            const newToast: Toast = {
                id: uuidv4(),
                variant: Toast_Vairant.DANGER,
                msg: 'Please select a status'
            }
            dispatch(addToast(newToast))

            
        }
        else {
            setShowModal(false)
        }


    }

    useEffect(() => {
        console.log(newStatus);
    }, [newStatus])

    const statusHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();

        const render: ReactElement = (
            <div className='text-left'>
                <p className="mb-6 font-medium text-sm">Change the order status to:</p>
                <div className="grid grid-cols-3 items-center justify-between  gap-6">
                    <select name="status" id="status" className='py-2 col-span-2 px-4 border-[1px] border-slate-600 text-sm rounded outline-none appearance-none' onChange={e => {e.preventDefault(), e.stopPropagation(), setNewStatus(e.target.value as Order_Status)}}>
                        <option value="" hidden>Choose a new status</option>
                        {
                            Object.keys(Order_Status).map(key =>
                                <option key={key} value={key}>{key}</option>
                            )
                        }
                    </select>
                    <button type="button" className={`min-w-[100px] bg-black text-sm text-white py-2 px-4 rounded text-center cursor-pointer `} onClick={e => saveHandler(e, id)}>Save</button>
                </div>
            </div >
        )
        setModalContent({ ...render })
    }

    
    const detailsHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        console.log(id);
        
        setModalContent(<OrderDetails order={order} />)
    }
    

    const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowModal(false)
        setModalContent(null)
    }

    useEffect(() => {
        if (modalContent) {
            setShowModal(true)
        }

    }, [modalContent])



    return (
        <div className='grid grid-cols-table-order px-8 py-4 border-b-[1px] items-center gap-x-8'>
            <img src="https://zwgxcetfcxbhggokckkn.supabase.co/storage/v1/object/public/ecommerce/sleek-cozy-black.png" />

            <span className='text-sm text-slate-500 '>
                asdasdf
            </span>

            <span className='text-sm text-slate-500'>
                {getMonth(order.timeStamp.getMonth()) + ', ' + order.timeStamp.getDate()}
            </span>

            <span className='text-sm text-slate-500'>
                $ {order.total}
            </span>

            <span className='text-sm text-slate-500'>
                {order.status}
            </span>

            <button onClick={e=>detailsHandler(e, order.id)} className='text-sm text-slate-600 border-[1px] p-2  border-slate-600 font-medium w-[130px] rounded'>
                View Details
            </button>

            {/* <span className='text-sm text-slate-500 flex items-center'>
                <Close classN='w-4 h-4' />
            </span> */}

            <div className='text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2'>
                <button onClick={() => setActionId('id1')} >...</button>
                {actionId === 'id1' &&
                    <div className='absolute  bg-white border-[1px] rounded-lg shadow w-[140px]  -translate-x-[75px] translate-y-[35px] after:content-[""] after:w-7 after:h-7  after:absolute after:z-10 after:-right-5 after:-top-4' onMouseLeave={() => setActionId('')}>
                        <button onClick={e => statusHandler(e, order.id)} className='block w-full text-sm font-normal text-left hover:bg-slate-100 px-4 py-4'>Change Status</button>
                    </div>
                }
            </div>

            {
                showModal && <Modal close={closeModal}>
                    {modalContent!}
                </Modal>
            }
        </div>
    )
}

export default OrderTile