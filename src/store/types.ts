export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export enum Status {
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED',
    IDLE = 'IDLE'
}
export interface Auth {
    isLoggedIn: boolean,
    status: Status,
    error: string,
}

export interface RootState {
    auth: Auth
}

export enum ProductColor {
    BLACK = "BLACK",
    RED = "RED",
    GRAY = "GRAY",
    WHITE = "WHITE",
    AMBER = "AMBER"
}

export enum ProductSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    EXTRA_LARGE = "EXTRA_LARGE",
}

export interface ProductImage {
    id: string,
    img: File | string
}


export interface Product {
    id: string,
    imgs: ProductImage[],
    title: string,
    slug: string,
    description: string,
    colors: ProductColor[],
    sizes: ProductSize[],
    price: number,
    quantity: number,
    sku: string,
    stockStatus: boolean,
    category: string[],
    featured: boolean
}

export interface Product_Order {
    productId: string,
    quantity: number
}

export interface ValidateSchema<T> {
    name: string,
    type: string,
    value: T
}
export interface FormError {
    [key: string]: string
}

export interface Customer {
    id:string
}

export enum Order_Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    PROCESSING = 'PROCESSING',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
    SHIPPED = 'SHIPPED',
    REFUNDED = 'REFUNDED',
}

export interface Order {
    id: string,
    total: number,
    customerId: string,
    timeStamp: Date,
    products: Product_Order[],
    status: Order_Status
}

export enum Toast_Vairant {
    DANGER = 'DANGER',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
}
export type Toast =  {
    id: String,
    variant: Toast_Vairant,
    msg:String
}