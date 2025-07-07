import { Link } from "react-router-dom"

const UserOrders = () => {
  return (
    <div className=" pt-8 pb-12 px-8 rounded-lg basis-2/3">
      <h2 className="font-bold mb-8">Orders</h2>
      <div className="grid grid-cols-ui-table-order items-center gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] mb-6">
        <span className="text-sm text-slate-500 font-semibold ">Order Number</span>
        <span className="text-sm text-slate-500 font-semibold">Date</span>
        <span className="text-sm text-slate-500 font-semibold ">Items</span>
        <span className="text-sm text-slate-500 font-semibold">Total</span>
        <span className="text-sm text-slate-500 font-semibold">Status</span>
        <span className="text-sm text-slate-500 font-semibold">Action</span>
      </div>
      <div className="grid grid-cols-ui-table-order items-center justify-between gap-x-8 px-8 py-4 border-b-[1px] ">
        <span className="text-sm text-slate-500 ">123123</span>
        <span className="text-sm text-slate-500">07 July 025</span>
        <span className="text-sm text-slate-500 ">4</span>
        <span className="text-sm text-slate-500">134.5</span>
        <span className="text-sm text-slate-500">PENDING</span>
        <Link to="./23232" className="text-sm text-slate-600 border-[1px] p-2  border-slate-600 font-medium w-[120px] text-center rounded" >View Details</Link>
      </div>
      <div className="grid grid-cols-ui-table-order items-center justify-between gap-x-8 px-8 py-4 border-b-[1px] ">
        <span className="text-sm text-slate-500 ">123123</span>
        <span className="text-sm text-slate-500">07 July 025</span>
        <span className="text-sm text-slate-500 ">4</span>
        <span className="text-sm text-slate-500">134.5</span>
        <span className="text-sm text-slate-500">PENDING</span>
        <Link to={'./00980980'} className="text-sm text-slate-600 border-[1px] p-2  border-slate-600 font-medium w-[120px] text-center rounded" >View Details</Link>
      </div>
    </div>
  )
}

export default UserOrders