import React from 'react'
import StarIcon from './ui/StarIcon'

type Props = {}

const Reviews = (props: Props) => {
    return (
        <div id='reviews-tab'>
            <p className="font-semibold mb-4">Reviews</p>
            <div className='flex gap-4 items-center mb-10'>
                <h2 className="text-3xl font-bold">4.2</h2><span className="w-4 h-[2px] bg-slate-400"></span> <p className='text-slate-500 text-xs'>54 Reviews</p>
            </div>

            <button className="border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm font-medium mb-2">Write a review</button>

            <div className='border-cultured border-b-[1px] py-4 flex justify-end mb-16'>
                <p className="text-xs text-slate-600 uppercase font-semibold tracking-wider flex gap-2 items-center">sort by <span className="w-2 h-2 border-b-2 border-r-2 rotate-45 border-slate-600 -translate-y-[2px]"></span></p>
            </div>

            <div className="wrapper pb-8">
                {new Array(3).fill('*').map((_, i) =>

                    <div className="flex items-start justify-between mb-12 gap-10">
                        <div className="flex items-start justify-between gap-4">

                            <div className="basis-1/12">
                                <span className="bg-slate-200 w-10 h-10 rounded-full block"></span>
                            </div>

                            <div className='basis-11/12'>
                                <p className="mb-2">Emily Davis</p>
                                <p className="mb-4 text-slate-600 uppercase text-sm">1 week ago</p>
                                <p className="text-slate-600  text-sm">
                                    This company always goes above and beyond to satisfy their customers.
                                </p>
                            </div>

                        </div>
                        <div className='flex gap-1'>
                            {new Array(5).fill('*').map((_, i) =>
                                <StarIcon key={i} />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <button className="border-[1px] border-slate-600 py-2 px-4 rounded text-center cursor-pointer text-sm font-medium text-slate-600 mx-auto block">Load more reviews</button>
        </div>
    )
}

export default Reviews