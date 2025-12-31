import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../types/models";

const categorySchema: Schema<ICategory> = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true,
    },
});

const Category: Model<ICategory> = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
