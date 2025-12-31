import { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IReview {
    name: string;
    rating: number;
    comment: string;
    user: Types.ObjectId;
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    image: string;
    brand: string;
    quantity: number;
    category: Types.ObjectId;
    description: string;
    reviews: IReview[];
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICategory extends Document {
    _id: Types.ObjectId;
    name: string;
}

export interface IOrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: Types.ObjectId;
    _id?: Types.ObjectId;
}

export interface IShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface IPaymentResult {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
}

export interface IOrder extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    paymentResult?: IPaymentResult;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface JWTPayload {
    userId: string;
}
