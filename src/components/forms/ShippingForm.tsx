
type Props = {}

const ShippingForm = (props: Props) => {
    return (
        <form className="grid grid-cols-2 gap-x-20 gap-y-6">
             <fieldset className="col-span-2">
                <label htmlFor="streetAddress" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">Street Address</label>
                <input id="streetAddress" name="streetAddress" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value='' />
            </fieldset>

            <fieldset className="">
                <label htmlFor="city" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">City</label>
                <input type="text" id="city" name="city" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value="" />
            </fieldset>
            <fieldset className="">
                <label htmlFor="state" className=" font-medium text-slate-600 text-sm block mb-2 w-full">State</label>
                <input type="text" id="state" name="state" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value="" />
            </fieldset>
            <fieldset className="">
                <label htmlFor="zipcode" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">zipcode</label>
                <input type="number" inputMode="numeric" id="zipcode" name="zipcode" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value="" />
            </fieldset>

            <fieldset className="mb-4">
                <label htmlFor="country" className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">country</label>
                <input type="text" id="country" name="country" className="border-[1px] outline-none block px-4 py-2 rounded w-full" value="" />
            </fieldset>
            <button type="submit" id="add_product" className="w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer">Submit</button>
        </form>
    )
}

export default ShippingForm