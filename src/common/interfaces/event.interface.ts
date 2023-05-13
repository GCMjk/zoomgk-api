import { IUser } from "@common/interfaces/user.interface";
import { IFile } from "@common/interfaces/file.interface";

export interface IEvent {
    _id: string;
    event: string;
    description: string;
    date: Date;
    serviceID: string;
    access: IAccess[];
    cover: IFile;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAccess {
    role: RoleEnum;
    userID: IUser
}

export enum RoleEnum {
    OWNER = 'OWNER',
    CELEBRANT = 'CELEBRANT',
    GUEST = 'GUEST'
}