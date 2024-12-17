import { TypeCart } from "./shop";


export type TypeUser = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
    phoneNumber: string,
    emailVerified: boolean,
}


export type TypeProfile = {
    displayName: string,
    id: string
    cart: TypeCart[]
}


export type TypeUserProfile = TypeUser & TypeProfile