import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../routes/users/helpers";
import { UnauthorizedError } from "../utils/errors";

interface CustomRequest extends Request {
    user: { id: string, email: string, name: string };
}

export const authenticateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            throw new UnauthorizedError('Authorization token missing in the request!');
        }

        const userData = verifyToken(accessToken);
        req.user = userData;

        next();
    } catch (err) {
        next(err);
    }
}
