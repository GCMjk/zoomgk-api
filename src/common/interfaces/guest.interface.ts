import { IUser } from "./user.interface";

export interface IGuest {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    confirmed: boolean;
    confirmationToken: string;
    userID: IUser;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}