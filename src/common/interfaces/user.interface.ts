import { IFile } from "./file.interface";
import { ISubscription } from "./subscription.interface";

export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    gender: GenderEnum;
    birthday: Date;
    email: string;
    password: string;
    role: RoleEnum;
    subscriptionID?: ISubscription;
    avatar: IFile;
    confirmed: boolean;
    confirmationToken: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum RoleEnum {
    ADMIN = 'ADMIN',
    USER = 'USER',
    CLIENT = 'CLIENT'
}