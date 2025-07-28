import { useQuery } from "@apollo/client"
import AccountDetailsForm from "../../components/forms/AccountDetailsForm"
import { GET_CUSTOMER } from "../../data/query"
import { useSelector } from "react-redux"
import { useAuth } from "../../store/slices/authSlice"
import ProgressLoader from "../../components/ui/ProgressLoader"

const AccountDetails = () => {

  const {user} = useSelector(useAuth)

  const {data, loading, refetch} = useQuery(GET_CUSTOMER, {
    variables: {
      customerId: user?.id
    }
  })

  const userDetails = data?.customer

  if(loading) {
    return <ProgressLoader />
  }

  return (
    <>
      <h2 className="font-bold mb-16">Account Details</h2>
      <div className="mb-8 w-[320px]">
        <AccountDetailsForm user={userDetails} refetchQuery= {refetch} />
      </div>
    </>)
}

export default AccountDetails