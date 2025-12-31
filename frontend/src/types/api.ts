import { Types } from "mongoose";

export interface User {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

export interface Review {
    _id?: string;
    name: string;
    rating: number;
    comment: string;
    user: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Product {
    _id: string;
    name: string;
    image: string;
    brand: string;
    quantity: number;
    category: string | Category;
    description: string;
    reviews: Review[];
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    _id: string;
    name: string;
}

export interface OrderItem {
    _id?: string;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
}

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface PaymentResult {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
}

export interface Order {
    _id: string;
    user: string | User;
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult?: PaymentResult;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem extends Product {
    qty: number;
}

export interface CartState {
    cartItems: CartItem[];
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
    shippingAddress?: ShippingAddress;
    paymentMethod?: string;
}

export interface AuthState {
    userInfo: User | null;
}

export interface FavoritesState {
    favorites: Product[];
}

export interface ShopState {
    checked: string[];
    radio: number[];
}
