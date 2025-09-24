import useAvatar from '../../hooks/useAvatar'

const RecentOrders = () => {
  const { avatar } = useAvatar()

  return (
    <div>
        <p className="font-semibold p-4 text-slate-600 flex justify-between items-center">
            <span>Recent Orders</span>
            <button className="bg-cultured p-2 text-xs rounded-full px-4">
              View All
            </button>
          </p>

          <div className="grid grid-cols-7 gap-x-4 p-4 border-t-[1px] border-b-[1px]">
            <span className='text-xs text-slate-500 font-medium '>
              Order Number
            </span>
            <span className='text-xs text-slate-500 font-medium '>
              Items
            </span>
            <span className='text-xs text-slate-500 font-medium col-span-2'>
              Customer
            </span>
            <span className='text-xs text-slate-500 font-medium'>
              Status
            </span>
            <span className='text-xs text-slate-500 font-medium'>
              Total
            </span>
            <span className='text-xs text-slate-500 font-medium'>
              Date
            </span>
          </div>

          {
            (new Array(5)).fill('*').map((_, i) =>
              <div key={i} className="grid grid-cols-7 px-4 py-2 border-b-[1px] items-center gap-x-4">
                <span className="text-xs text-slate-500 ">1752715553834</span>
                <span className="text-xs text-slate-500 capitalize">4</span>

                <div className="text-xs text-slate-500 col-span-2 flex items-center gap-2">
                  {avatar}
                  <span>
                    Bivek Gurung
                  </span>
                </div>
                <span className="text-xs text-slate-500 capitalize">processing</span>
                <span className="text-xs text-slate-500">$ 71.5</span>
                <span className="text-xs text-slate-500">17 June 2025</span>
              </div>
            )
          }
    </div>
  )
}

export default RecentOrders