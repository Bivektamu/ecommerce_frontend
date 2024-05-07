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
    ORANGE = "ORANGE"
}

export enum ProductSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    EXTRA_LARGE = "EXTRA_LARGE",
}

export interface ProdcutImage {
    color: ProductColor,
    imgSrc: String

}

export interface Product {
    id: String,
    userId: String,
    imgs: ProdcutImage[],
    title: string,
    slug: string,
    details: string,
    colors: ProductColor[],
    sizes: ProductSize[],
    price: number,
    quantity: number,
    sku: string,
    stockStatus: boolean,
    category: string[],
    featured: boolean
}