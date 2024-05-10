import { Order, Order_Status, Product, ProductColor, ProductSize } from './store/types'

type Data = {
    products: Product[],
    orders: Order[]
}

const data:Data = 
{
    products: 
    [
        {
            id: 'asdf123',
            title: 'Sleek and Cozy Black',
            sku: 'WVT002',
            price: 67,
            category: ['hoodies'],
            slug: 'sleek-and-cozy-black',
            colors: [ProductColor.BLACK, ProductColor.RED],
            stockStatus: true,
            sizes: [ProductSize.SMALL, ProductSize.MEDIUM],
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
                    productId: 'prodcut1',
                    quantity: 3
                },
            ],
            status: Order_Status.COMPLETED

        },
    ]
}
export default data