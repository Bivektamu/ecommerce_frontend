import { useQuery } from "@apollo/client"
import { GET_WISH_LIST_BY_USER_ID } from "../../data/query"
import { useSelector } from "react-redux"
import { useAuth } from "../../store/slices/authSlice"
import ProgressLoader from "../../components/ui/ProgressLoader"
import { useMemo } from "react"
import { stripTypename } from "@apollo/client/utilities"

const WishList = () => {
  const { user } = useSelector(useAuth)

  const { data, loading } = useQuery(GET_WISH_LIST_BY_USER_ID, {
    variables: {
      userId: user?.id
    }
  })

  const wishList = useMemo(() => {
    if (!data) return {}
    return stripTypename(data.wishListByUserId)
  }, [data])

  console.log(wishList)

  if (loading) {
    return <ProgressLoader />
  }

  return (
    <div>
      <h2 className="font-bold mb-8">Wishlist</h2>
      <div className="mb-8 w-[620px]">
        
        <div className="flex items-center justify-between border-b-[1px] py-12">
          <div className="flex items-center gap-6 ">
            {/* <div className="bg-cultured"> */}
            <img src="https://ecommerce-backend-cloud.s3.amazonaws.com/utraanet-black-66e3c970d638887d2bbef4e8.png" alt="UTRAANET Black" className="w-20 h-20 object-contain" />
            {/* </div> */}
            <div>
              <h3 className="font-semibold mb-2">UTRAANET Black</h3>
              <p className="text-xs font-medium mb-2 text-slate-600">Added on: 27 July 2023</p>
              <button className="text-sm font-medium">Remove Item</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold mr-4">$ 43</p>

            <a className="text-sm border-[1px] p-2  border-slate-700 font-medium w-[120px] text-center rounded" href="/account/orders/23232">Add to cart</a>
          </div>
        </div>

        <div className="flex items-center justify-between border-b-[1px] py-12">
          <div className="flex items-center gap-6 ">
            {/* <div className="bg-cultured"> */}
            <img src="https://ecommerce-backend-cloud.s3.amazonaws.com/utraanet-black-66e3c970d638887d2bbef4e8.png" alt="UTRAANET Black" className="w-20 h-20 object-contain" />
            {/* </div> */}
            <div>
              <h3 className="font-semibold mb-2">UTRAANET Black</h3>
              <p className="text-xs font-medium mb-2 text-slate-600">Added on: 27 July 2023</p>
              <button className="text-sm font-medium">Remove Item</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold mr-4">$ 43</p>

            <a className="text-sm border-[1px] p-2  border-slate-700 font-medium w-[120px] text-center rounded" href="/account/orders/23232">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishList