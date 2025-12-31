import mongoose, { Schema, Model } from "mongoose";
import { IOrder } from "../types/models";

const orderSchema: Schema<IOrder> = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],

        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },

        paymentMethod: {
            type: String,
            required: true,
        },

        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },

        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },

        paidAt: {
            type: Date,
        },

        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },

        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
