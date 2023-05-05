import { IUser } from "@common/interfaces/user.interface";
import { IGuest } from "@common/interfaces/guest.interface";

export interface IEvent {
    _id: string;
    title: string;
    description: string;
    date: Date;
    user: IUser;
    guests: IGuest[];
    key: string;
    createdAt: Date;
    updatedAt: Date;
}