export interface ISubscription {
    _id: string;
    title: string;
    description: string;
    price: number;
    numberOfGuests: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}