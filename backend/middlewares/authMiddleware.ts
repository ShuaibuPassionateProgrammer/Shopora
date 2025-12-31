import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../types/models";

const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
            req.user = await User.findById(decoded.userId).select("-password") || undefined;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
});

const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as an admin.");
    }
};

export { authenticate, authorizeAdmin };
