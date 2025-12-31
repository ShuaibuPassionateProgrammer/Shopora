import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Request, Response } from "express";

const createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" }) as any;
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Already exists" }) as any;
        }

        const category = await new Category({ name }).save();
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error) as any;
    }
});

const updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({ _id: categoryId });

        if (!category) {
            return res.status(404).json({ error: "Category not found" }) as any;
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const removeCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const removed = await Category.findByIdAndRemove(req.params.categoryId);
        res.json(removed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const listCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const all = await Category.find({});
        res.json(all);
    } catch (error) {
        console.log(error);
        return res.status(400).json((error as Error).message) as any;
    }
});

const readCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json((error as Error).message) as any;
    }
});

export {
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory,
};
