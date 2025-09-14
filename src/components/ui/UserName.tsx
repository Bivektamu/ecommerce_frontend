import { useQuery } from '@apollo/client';
import { GET_PUBLIC_USER_DETAILS, GET_USER_NAME } from '../../data/query';
import TextLoader from './TextLoader';

type Props = {
    id: string;
};
// Define the expected type for the GraphQL response
type UserNameData = {
    userName: {
        firstName: string;
        lastName: string;
    };
};

const UserName = ({ id }: Props) => {
     const { data, error, loading } = useQuery<UserNameData>(GET_PUBLIC_USER_DETAILS, {
        variables: { userId: id },
    });

    if(loading) return <TextLoader cssClass='gap-4 h-4 w-24 ml-0' col='2' />

    if(error) {
        console.log(error.message)
        return <p>Inactive User</p>
    }


    const { firstName, lastName } = data?.userName;


    return <p>{firstName} {lastName}</p>;
};

export default UserName;
