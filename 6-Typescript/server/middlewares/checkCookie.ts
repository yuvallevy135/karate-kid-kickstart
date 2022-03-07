
import { v4 as uuid } from 'uuid';
import {Request, Response, NextFunction} from 'express'

export const checkCookie = function (req: Request, res: Response, next: NextFunction) {
    const userId: string = req.cookies['userId'];
    if (!userId) {
        const userId: string = uuid();
        res.cookie('userId', userId, {httpOnly: true, secure: true });
    }
    req.body.userId = userId
    next()
}
