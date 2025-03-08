import { useSuspenseQuery } from '@apollo/client';
import { GET_CUSTOMER_NAME } from '../../data/query';
import { Suspense } from 'react';
import TextLoader from './TextLoader';

type Props = {
    id: string;
};

const CustomerNameContent = ({ id }: Props) => {
    const { data } = useSuspenseQuery(GET_CUSTOMER_NAME, {
        variables: { customerNameId: id },
    });


    const { firstName, lastName } = data.customerName;
    
    return <p>{firstName} {lastName}</p>;
};

const CustomerName = ({ id }: Props) => {
    return (
        <Suspense fallback={<TextLoader cssClass='gap-4 h-4 w-24 ml-0' col='2' />}>
            <CustomerNameContent id={id} />
        </Suspense>
    );
};

export default CustomerName;
