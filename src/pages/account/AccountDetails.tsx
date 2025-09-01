import { useQuery } from "@apollo/client"
import AccountDetailsForm from "../../components/forms/AccountDetailsForm"
import { GET_USER } from "../../data/query"
import { useAuth } from "../../store/slices/authSlice"
import ProgressLoader from "../../components/ui/ProgressLoader"
import { stripTypename } from "@apollo/client/utilities"

const AccountDetails = () => {

  const {authUser} = useAuth()

  const {data, loading, refetch} = useQuery(GET_USER, {
    variables: {
      userId: authUser?.id
    }
  })

  const userDetails = stripTypename(data?.user)

  if(loading) {
    return <ProgressLoader />
  }

  // console.log(userDetails)

  return (
    <>
      <h2 className="font-bold mb-16">Account Details</h2>
      <div className="mb-8 w-[320px]">
        <AccountDetailsForm user={userDetails} refetchQuery= {refetch} />
      </div>
    </>)
}

export default AccountDetails