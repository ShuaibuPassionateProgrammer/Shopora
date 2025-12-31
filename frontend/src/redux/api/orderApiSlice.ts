import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { Order, OrderItem, ShippingAddress } from "../../types/api";

interface CreateOrderRequest {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}

interface PayOrderRequest {
    orderId: string;
    details: {
        id: string;
        status: string;
        update_time: string;
        payer: {
            email_address: string;
        };
    };
}

interface PaypalClientIdResponse {
    clientId: string;
}

interface TotalOrdersResponse {
    totalOrders: number;
}

interface TotalSalesResponse {
    totalSales: number;
}

interface SalesByDateResponse {
    _id: string;
    totalSales: number;
}

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<Order, CreateOrderRequest>({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: order,
            }),
        }),

        getOrderDetails: builder.query<Order, string>({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
        }),

        payOrder: builder.mutation<Order, PayOrderRequest>({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: "PUT",
                body: details,
            }),
        }),

        getPaypalClientId: builder.query<PaypalClientIdResponse, void>({
            query: () => ({
                url: PAYPAL_URL,
            }),
        }),

        getMyOrders: builder.query<Order[], void>({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),

        getOrders: builder.query<Order[], void>({
            query: () => ({
                url: ORDERS_URL,
            }),
        }),

        deliverOrder: builder.mutation<Order, string>({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: "PUT",
            }),
        }),

        getTotalOrders: builder.query<TotalOrdersResponse, void>({
            query: () => `${ORDERS_URL}/total-orders`,
        }),

        getTotalSales: builder.query<TotalSalesResponse, void>({
            query: () => `${ORDERS_URL}/total-sales`,
        }),

        getTotalSalesByDate: builder.query<SalesByDateResponse[], void>({
            query: () => `${ORDERS_URL}/total-sales-by-date`,
        }),
    }),
});

export const {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    // ------------------
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    useGetOrdersQuery,
} = orderApiSlice;
