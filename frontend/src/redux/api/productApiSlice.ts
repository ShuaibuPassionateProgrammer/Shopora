import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { Product } from "../../types/api";

interface GetProductsRequest {
    keyword?: string;
}

interface GetProductsResponse {
    products: Product[];
    page: number;
    pages: number;
    hasMore: boolean;
}

interface UpdateProductRequest {
    productId: string;
    formData: FormData;
}

interface CreateReviewRequest {
    productId: string;
    rating: number;
    comment: string;
}

interface GetFilteredProductsRequest {
    checked: string[];
    radio: number[];
}

interface UploadImageResponse {
    message: string;
    image: string;
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, GetProductsRequest>({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
        }),

        getProductById: builder.query<Product, string>({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, productId) => [
                { type: "Product", id: productId },
            ],
        }),

        allProducts: builder.query<Product[], void>({
            query: () => `${PRODUCT_URL}/allProducts`,
        }),

        getProductDetails: builder.query<Product, string>({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation<Product, FormData>({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),

        updateProduct: builder.mutation<Product, UpdateProductRequest>({
            query: ({ productId, formData }) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: formData,
            }),
        }),

        uploadProductImage: builder.mutation<UploadImageResponse, FormData>({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        deleteProduct: builder.mutation<{ message: string }, string>({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
            providesTags: ["Product"],
        }),

        createReview: builder.mutation<{ message: string }, CreateReviewRequest>({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
        }),

        getTopProducts: builder.query<Product[], void>({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
        }),

        getNewProducts: builder.query<Product[], void>({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
        }),

        getFilteredProducts: builder.query<Product[], GetFilteredProductsRequest>({
            query: ({ checked, radio }) => ({
                url: `${PRODUCT_URL}/filtered-products`,
                method: "POST",
                body: { checked, radio },
            }),
        }),
    }),
});

export const {
    useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImageMutation,
    useGetFilteredProductsQuery,
} = productApiSlice;
