const UserOrderDetails = () => {
  return (
    <div className=" pt-8 pb-12 px-8 rounded-lg basis-2/3">

      <div className="summary-wrapper mb-20">
        <h1 className="font-bold mb-12">Order Summary</h1>

        <div className="flex items-center gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] ">
          <span className="text-sm text-slate-500 font-semibold basis-1/3 ">Order Number</span>
          <span className="text-sm text-slate-500 basis-2/3">123123123</span>
        </div>

        <div className="flex items-center gap-x-8 px-8 py-4 border-b-[1px]">
          <span className="text-sm text-slate-500 font-semibold basis-1/3 ">Placed On</span>
          <span className="text-sm text-slate-500 basis-2/3">07 July 025</span>
        </div>

        <div className="flex items-center gap-x-8 px-8 py-4 border-b-[1px]">
          <span className="text-sm text-slate-500 font-semibold basis-1/3">Status</span>
          <span className="text-sm text-slate-500 basis-2/3">PENDING</span>
        </div>

        <div className="flex items-center gap-x-8 px-8 py-4 border-b-[1px]">
          <span className="text-sm text-slate-500 font-semibold basis-1/3">Total</span>
          <span className="text-sm text-slate-500 basis-2/3">134.5</span>
        </div>

        <div className="flex items-center gap-x-8 px-8 py-4 border-b-[1px]">
          <span className="text-sm text-slate-500 font-semibold basis-1/3">Shipping Address</span>
          <span className="text-sm text-slate-500 basis-2/3">32B Hinton Loop, Oran Park, NSW, 2570</span>
        </div>
      </div>



      <h2 className="font-semibold mb-8">Order Items</h2>

      <div className="grid grid-cols-8 items-center gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] mb-6">
        <span className="">&nbsp;</span>
        <span className="text-sm text-slate-500 font-semibold  col-span-2">Product</span>
        <span className="text-sm text-slate-500 font-semibold">Qty</span>
        <span className="text-sm text-slate-500 font-semibold ">Colour</span>
        <span className="text-sm text-slate-500 font-semibold">Size</span>
        <span className="text-sm text-slate-500 font-semibold">Unit Price</span>
        <span className="text-sm text-slate-500 font-semibold">Subtotal</span>
      </div>

      <div className="grid grid-cols-8 items-center gap-x-8 px-8 py-4  border-b-[1px]">
        <img className="w-14" src="https://ecommerce-backend-cloud.s3.amazonaws.com/essential-neutrals-66e3c8fdd638887d2bbef4e7.png" alt="" />

        <span className="text-sm text-slate-500  col-span-2">
          Essential Neutrals
        </span>
        <span className="text-sm text-slate-500">2</span>
        <span className="text-sm text-slate-500 ">Red</span>
        <span className="text-sm text-slate-500">Small</span>
        <span className="text-sm text-slate-500">22</span>
        <span className="text-sm text-slate-500">44</span>
      </div>
      
      <div className="grid grid-cols-8 items-center gap-x-8 px-8 py-4  border-b-[1px]">
        <img className="w-14" src="https://ecommerce-backend-cloud.s3.amazonaws.com/utraanet-black-66e3c970d638887d2bbef4e8.png" alt="" />

        <span className="text-sm text-slate-500  col-span-2">
          UTRAANET Black
        </span>
        <span className="text-sm text-slate-500">2</span>
        <span className="text-sm text-slate-500 ">Black</span>
        <span className="text-sm text-slate-500">Large</span>
        <span className="text-sm text-slate-500">43</span>
        <span className="text-sm text-slate-500">86</span>
      </div>

    </div>
  )
}

export default UserOrderDetails