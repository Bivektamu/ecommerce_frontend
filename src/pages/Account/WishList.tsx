import { Link } from "react-router-dom"

const WishList = () => {
  return (
    <div className=" pt-8 pb-12 px-8 rounded-lg basis-2/3">
      <h2 className="font-bold mb-8">WishList</h2>

      <div className="grid grid-cols-8 items-center gap-x-8 px-8 py-4 border-t-[1px] border-b-[1px] mb-6">
        <span className="">&nbsp;</span>
        <span className="text-sm text-slate-500 font-semibold  col-span-2">Product</span>
        <span className="text-sm text-slate-500 font-semibold ">Colour</span>
        <span className="text-sm text-slate-500 font-semibold">Size</span>
        <span className="text-sm text-slate-500 font-semibold">Unit Price</span>
        <span className="text-sm text-slate-500 font-semibold text-center">Action</span>
      </div>

      <div className="grid grid-cols-8 items-center gap-x-8 px-8 py-4  border-b-[1px]">
        <img className="w-14" src="https://ecommerce-backend-cloud.s3.amazonaws.com/essential-neutrals-66e3c8fdd638887d2bbef4e7.png" alt="" />

        <span className="text-sm text-slate-500  col-span-2">
          Essential Neutrals
        </span>
        <span className="text-sm text-slate-500">None</span>
        <span className="text-sm text-slate-500 ">None</span>
        <span className="text-sm text-slate-500">22</span>

        <div className="text-lg text-slate-500 font-semibold relative flex items-center justify-center pb-2">
          <button>...</button>
          <div className="absolute bg-white  border-[1px] rounded-lg shadow w-[110px]  -translate-x-[55px] translate-y-[45px]">
            <button className="block w-full text-xs font-normal text-left hover:bg-slate-200 px-4 py-2" >Remove Item</button>
            <button className="block w-full text-xs font-normal text-left hover:bg-slate-200 px-4 py-2" >Add to cart</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WishList