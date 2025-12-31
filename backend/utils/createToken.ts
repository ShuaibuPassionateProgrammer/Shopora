import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

const generateToken = (res: Response, userId: Types.ObjectId): string => {
    const token = jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set JWT as an HTTP-Only Cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken;
