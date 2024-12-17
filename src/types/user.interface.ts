import { CartInterface } from "./shop.interface";


export interface UserInterface{
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
    phoneNumber: string,
    emailVerified: boolean,
}


export interface UserProfileInterface extends UserInterface{
    displayName: string,
    id: string
    cart: CartInterface[]
}

export interface StoreUserProfileInterface{
    currentUser: UserProfileInterface | null
}