import { IUser } from "@common/interfaces/user.interface";

export interface IEvent {
    _id: string;
    title: string;
    description: string;
    date: Date;
    user: IUser;
    guests: IUser[];
    key: string;
    createdAt: Date;
    updatedAt: Date;
}