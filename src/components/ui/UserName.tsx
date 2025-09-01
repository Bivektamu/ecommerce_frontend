import { useSuspenseQuery } from '@apollo/client';
import { GET_USER_NAME } from '../../data/query';
import { Suspense } from 'react';
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

const UserNameContent = ({ id }: Props) => {
    const { data } = useSuspenseQuery<UserNameData>(GET_USER_NAME, {
        variables: { userNameId: id },
    });


    const { firstName, lastName } = data.userName;

    return <p>{firstName} {lastName}</p>;
};

const UserName = ({ id }: Props) => {
    return (
        <Suspense fallback={<TextLoader cssClass='gap-4 h-4 w-24 ml-0' col='2' />}>
            <UserNameContent id={id} />
        </Suspense>
    );
};

export default UserName;
