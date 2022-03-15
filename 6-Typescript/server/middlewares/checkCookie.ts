import { v4 as uuid } from "uuid";
import { RequestHandler } from "express";

export const checkCookie: RequestHandler = function (req, res, next) {
    const userId: string = req.cookies["userId"];
    if (!userId) {
        const userId: string = uuid();
        res.cookie("userId", userId, { httpOnly: true, secure: true });
    }
    next();
};
