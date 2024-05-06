export interface User {
    firstName: string,
    lastName:string,
    email:string,
    password:string
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
    error:string,
}

export interface RootState {
    auth: Auth
}