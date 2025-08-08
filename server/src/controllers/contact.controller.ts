import { Request, Response, NextFunction } from "express";

import ApiError from "../utils/api-error";
import { ApiResponce } from "../utils/api-responce";
import { ContactInputSchema } from "../validators/Contact.types";

// list all contacts
export async function listContacts(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
        next(err);
    }
}

// add new contact
export async function createContact(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
        next(err);
    }
}

// delete contact
export async function removeContact(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
        next(err);
    }
}
