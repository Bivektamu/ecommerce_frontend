import { JwtPayload } from "jwt-decode"

export interface Address {
    street: string,
    city: string,
    postcode: string,
    country: string,
    state: string
}
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
export type CustomerId = Customer['id']

export type CustomerEmail = Customer['email']

export interface CustomerInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address?: Address,
    isActive?: boolean,
    isVerified?: boolean
}

export interface CustomerEditInput {
    id: CustomerId
    firstName: string,
    lastName: string,
    email: string,
    address?: Address,
    isActive?: boolean,
    isVerified?: boolean
}


export interface CreateUserForm {
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

export enum Role {
    ADMIN = "admin",
    CUSTOMER = "customer"
}
export interface User {
    role: Role,
    id: string
}

export enum ErrorCode {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    BAD_CREDENTIALS = 'BAD_CREDENTIALS',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
} 

export interface CustomError {
    msg: string,
    code?: ErrorCode
}
export interface Auth {
    isLoggedIn: boolean,
    user: User | null,
    status: Status,
    error: CustomError | null,
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
    cart: CartSlice,
    reviews: ReviewSlice
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
export interface QueriedProductImage extends ProductImage {
    __typename?: string
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
export interface QueriedProduct extends Omit<Product, 'imgs'> {
    __typename: string,
    imgs: QueriedProductImage[]
}
export interface ProductEditInput extends Omit<Product, 'imgs'> {
    __typename?: string
    oldImgs: ProductImage[],
    newImgs: ProductImageInput[]
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
    userId: string | null
    color: Colour | null,
    quantity: number,
    size: Size | null,
    price: number | null,
    imgUrl: string
}

export interface CartSlice {
    cart: Cart[],
    action: Action | null
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


export interface OrderItem {
    id: string,
    productId: ProductId,
    color: Colour,
    quantity: number,
    size: Size,
    price: number,
    imgUrl: string
}

export type OrderItemInput  = Omit<OrderItem, 'id'>

export interface Order {
    id: string,
    orderNumber: number,
    userId: string,
    items: OrderItem[],
    status: Order_Status,
    subTotal:number,
    total: number,
    tax:number,
    shippingAddress: Address,
    orderPlaced:Date
}

export interface OrderInput  extends Omit<Order, 'id' | 'items' | 'orderNumber' | 'orderPlaced'> {
    items: OrderItemInput[]
}


export interface Review {
    id: string,
    userId: CustomerId,
    productId: ProductId,
    review: string,
    timeStamp: Date,
    rating: null | number,
}


export interface ReviewInput {
    userId: CustomerId,
    productId: ProductId,
    review: string,
    rating: null | number,
}


export interface ReviewSlice {
    reviews: Review[],
    status: Status,
    error: string,
    action: Action | null
}


export interface LoginInput {
    email:string,
    password:string
}

export type LoginResponse = string

export interface CustomJwtPayload extends User, JwtPayload  {}

export interface LikedProduct {
    id: ProductId,
    createdAt: Date
}

export interface WishList {
    id: string,
    userId: string,
    products: [LikedProduct]
}