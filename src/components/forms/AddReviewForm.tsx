import React from 'react'
import { RatingWidget } from '../ui/RatingWidget'


const AddReviewForm = () => {
  return (
    <div className="bg-white rounded-lg">
      <p className="px-8 py-2 border-b-[1px] font-semibold">Create Review</p>
      <div className=" px-8 py-12  max-w-[800px]">
        <form className="">
          <div className="flex flex-col gap-6">
            <div className="">
              <p className="capitalize font-medium text-slate-600 text-sm block mb-2 w-full">Overall rating</p>
              <RatingWidget stars={5}/>
            </div>

            <fieldset className="col-span-2">
              <label htmlFor="description" className=" font-medium text-slate-600 text-sm block mb-2 w-full">Add a written review</label>
              <textarea id="description" name="description" className="border-[1px] outline-none text-sm block px-4 py-2 rounded w-full max-w-full h-40"></textarea>
            </fieldset>
            <button type="submit" className="w-[200px] bg-black text-white py-2 px-4 rounded text-center cursor-pointer">Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddReviewForm