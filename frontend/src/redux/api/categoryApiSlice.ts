import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";
import { Category } from "../../types/api";

interface CreateCategoryRequest {
    name: string;
}

interface UpdateCategoryRequest {
    categoryId: string;
    updatedCategory: {
        name: string;
    };
}

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation<Category, CreateCategoryRequest>({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory,
            }),
        }),

        updateCategory: builder.mutation<Category, UpdateCategoryRequest>({
            query: ({ categoryId, updatedCategory }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updatedCategory,
            }),
        }),

        deleteCategory: builder.mutation<{ message: string }, string>({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            }),
        }),

        fetchCategories: builder.query<Category[], void>({
            query: () => `${CATEGORY_URL}/categories`,
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} = categoryApiSlice;
