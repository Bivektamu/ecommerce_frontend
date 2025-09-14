import { useQuery } from '@apollo/client';
import { GET_PUBLIC_USER_DETAILS } from '../../data/query';
import TextLoader from './TextLoader';

type Props = {
    id: string;
};
// Define the expected type for the GraphQL response

const UserName = ({ id }: Props) => {
     const { data, error, loading } = useQuery(GET_PUBLIC_USER_DETAILS, {
        variables: { userId: id },
    });

    if(loading) return <TextLoader cssClass='gap-4 h-4 w-24 ml-0' col='2' />
    if(error || !data) {
        return <p>Inactive User</p>
    }


    const details= data?.publicUserDetails;


    return <p>{details.firstName} {details.lastName}</p>;
};

export default UserName;
