import { Colour, Customer, Order, Order_Status, Product, Size } from './store/types'

type Data = {
    products: Product[],
    orders: Order[],
    customers: Customer[]
}

const data:Data = 
{
    products: 
    [
        {
            id: 'product1',
            title: 'Sleek and Cozy Black',
            sku: 'WVT002',
            price: 67,
            category: ['hoodies'],
            slug: 'sleek-and-cozy-black',
            colors: [Colour.BLACK, Colour.RED],
            stockStatus: true,
            sizes: [Size.SMALL, Size.MEDIUM],
            quantity: 10000,
            description: 'Our Sleek and Cozy Black Hoodie bridges the gap between casual comfort and streetwise style. Engineered for those who seek a cozy layer without sacrificing their urban aesthetic, this hoodie is a versatile staple that can take you from lounging to out-and-about with ease.',
            featured:true,
            imgs: [
                {
                    id: 'img1',
                    img: 'https://zwgxcetfcxbhggokckkn.supabase.co/storage/v1/object/public/ecommerce/sleek-cozy-black.png'
                }
            ]
    
        },
    ],
    orders: [
        {
            id: 'order1',
            total: 223,
            customerId: 'user1',
            timeStamp: new Date,
            products: [
                {
                    productId: 'product1',
                    quantity: 3,
                    size: Size.SMALL,
                    color:Colour.BLACK
                },
            ],
            status: Order_Status.COMPLETED

        },
    ],
    customers:[
        {
            id: 'user1',
            firstName: 'Bivek',
            lastName: 'Gurung',
            email:'bivek.tamu@gmail.com',
            address: {
                street:'32b hinton loop',
                suburb: 'oran park',
                city: 'sydney',
                postcode: '2570',
                state:'nsw'
            },
            isActive: true,
            isVerified: false,
            timeStamp: new Date,
        },
    ] 
}
export default data