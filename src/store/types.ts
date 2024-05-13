export interface Customer {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    timeStamp: Date,
    address: Address,
    isActive: boolean,
    isVerified: boolean
}

export interface CustomerInput {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    address?: Address,
    isActive?: boolean,
    isVerified?: boolean
}
export interface Address {
    street: string,
    suburb: string,
    city: string,
    postcode: string,
    state: string
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
    auth: Auth,
    toasts: ToastSlice
}

export enum Colour {
    BLACK = "BLACK",
    RED = "RED",
    GRAY = "GRAY",
    WHITE = "WHITE",
    AMBER = "AMBER"
}

export enum Size {
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L",
    EXTRA_LARGE = "XL",
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
    colors: Colour[],
    sizes: Size[],
    price: number,
    quantity: number,
    sku: string,
    stockStatus: boolean,
    category: string[],
    featured: boolean
}

export interface ProductInput extends Omit<Product, 'userId' | 'quantity' | 'price' | 'stockStatus'> {
    quantity: number | null,
    price: number | null,
    stockStatus: boolean | null,
}

export interface OrderedProduct {
    productId: string,
    color: Colour,
    quantity: number,
    size: Size
}

export interface ValidateSchema<T> {
    name: string,
    type: string,
    value: T
}
export interface FormError {
    [key: string]: string
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
    products: OrderedProduct[],
    status: Order_Status
}

export enum Toast_Vairant {
    DANGER = 'DANGER',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
}
export type Toast = {
    id: String,
    variant: Toast_Vairant,
    msg: String
}

export type ToastSlice = {
    toasts: Toast[]
}