import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodError } from 'zod';
import ApiError from '../utils/api-error';

// validate request body
export const validateRequest = (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Validating request body:', req.body);
        // Validate only the request body
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        console.log('Validation error:', err);
        if (err instanceof ZodError) {
            return next(new ApiError(400, 'Validation failed', err.issues as any));
        }
        next(err);
    }
};