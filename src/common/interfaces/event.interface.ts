import { IUser } from "@common/interfaces/user.interface";
import { IFile } from "@common/interfaces/file.interface";
import { IGuest } from "@common/interfaces/guest.interface";

export interface IEvent {
    _id: string;
    event: string;
    description: string;
    date: Date;
    serviceID: string;
    userID: IUser;
    guestID: IGuest;
    cover: IFile;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}