import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FavoritesState } from "../../../types/api";
import { RootState } from "../../store";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [] as Product[],
    reducers: {
        addToFavorites: (state, action: PayloadAction<Product>) => {
            // Checkif the product is not already favorites
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<Product>) => {
            // Remove the product with the matching ID
            return state.filter((product) => product._id !== action.payload._id);
        },
        setFavorites: (state, action: PayloadAction<Product[]>) => {
            // Set the favorites from localStorage
            return action.payload;
        },
    },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
    favoriteSlice.actions;
export const selectFavoriteProduct = (state: RootState) => state.favorites;
export default favoriteSlice.reducer;
