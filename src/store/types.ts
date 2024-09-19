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
type CustomerId = Customer['id']

export interface CustomerInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
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

export enum User {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}
export interface UserRole {
    userRole: User,
    id: string
}

export interface Auth {
    isLoggedIn: boolean,
    userRole: UserRole | null,
    status: Status,
    error: string,
}

export enum Action {
    FETCH = 'FETCH',
    ADD = 'ADD',
    DELETE = 'DELETE',
    EDIT = 'EDIT'
}

export interface ProductSlice {
    status: Status,
    error: string,
    products: Product[],
    action: Action | null
}

export interface CustomerSlice {
    status: Status,
    error: string | null,
    customers: Customer[],
    customer: Customer | null,
    action: Action | null
}

export interface RootState {
    auth: Auth,
    toasts: ToastSlice,
    products: ProductSlice,
    customers: CustomerSlice,
    cart: CartSlice
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

// export interface ProductImage {
//     _id: string,
//     img: File | string
// }


export interface ProductImage {
    id: string,
    url: string,
    fileName: string
}
export interface ProductImageInput {
    _id: string,
    img: File
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
    category: string,
    featured: boolean
}
type ProductId = Product['id']

export interface ProductInput extends Omit<Product, 'id' | 'quantity' | 'price' | 'stockStatus' | 'imgs'> {
    quantity: number | null,
    price: number | null,
    stockStatus: boolean | null,
    imgs: ProductImageInput[]
}

export interface ProductEditInput extends Omit<Product, 'imgs'> {
    oldImgs: ProductImage[],
    newImgs: ProductImageInput[]
}

export interface OrderedProduct {
    productId: ProductId,
    color: Colour,
    quantity: number,
    size: Size
}

export interface ValidateSchema<T> {
    name: string,
    type: string,
    value: T,
    msg?: string
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
    customerId: CustomerId,
    timeStamp: Date,
    products: OrderedProduct[],
    status: Order_Status
}

export enum Toast_Vairant {
    DANGER = 'DANGER',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING'
}
export type Toast = {
    id: string,
    variant: Toast_Vairant,
    msg: string
}

export type ToastSlice = {
    toasts: Toast[]
}


export interface Review {
    id: string,
    customerId: CustomerId,
    productId: ProductId,
    text: string,
    timeStamp: Date,
    rating: number,
}

export interface PriceRange {
    min: number | '',
    max: number | '',
}

export interface Filters {
    category: string[],
    colors: Colour[],
    sizes: Size[],
    price: PriceRange
}

export interface Cart {
    id: string,
    productId: ProductId,
    customerId:string | null
    color: Colour | null,
    quantity: number,
    size: Size | null,
    price: number | null
}

export interface CartSlice {
    cart: Cart[],
}