const LowStockProducts = () => {
    return (
        <div>
            <p className="font-semibold p-4 text-slate-600">
                Low Stock Products
            </p>

            <div className='p-4 flex flex-col gap-4'>
                {
                    (new Array(5)).fill('*').map((_, i) =>
                        <div key={`lowProduct-${i}`} className="flex items-center gap-4  rounded pr-3 border-[1px] justify-between shadow-lg">
                            <div className="flex items-center gap-2">
                                <img src="https://ecommerce-backend-cloud.s3.amazonaws.com/essential-neutrals-66e3c8fdd638887d2bbef4e7.png" alt="" className="w-16 h-16" />
                                <div className="">
                                    <p className="text-xs font-medium">Essential Neutrals</p>
                                    <p className="text-xs text-slate-500">SKU: AVC123</p>
                                </div>

                            </div>
                            <p className="font-medium">
                                <span>4</span> <span>pcs</span>
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LowStockProducts