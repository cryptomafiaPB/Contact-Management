import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/api-error';
import { ZodError } from 'zod';
import { env } from '../utils/env';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    // zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            statusCode: 400,
            message: "Validation Error",
            success: false,
            status: "error",
            details: err.issues,
        });
    }


    // custom ApiError
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            success: false,
            status: "error",
            details: err.error || undefined,
        });
    }

    const message = err.message || 'Internal Server Error';

    // Fallback for all other errors
    return res.status(500).json({
        statusCode: 500,
        message: message,
        success: false,
        status: "error",
        details: env.ENVIRONMENT === "development" ? err.stack : undefined,
    });
}