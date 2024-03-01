import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next();

    let status = 500;
    let message = 'Internal Server Error';

    if (err instanceof CustomError) {
        status = err.status;
        message = err.message;
    }

    return res.status(status).json({ message: message });
}