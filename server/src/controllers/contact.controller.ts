import { Request, Response, NextFunction } from "express";

import ApiError from "../utils/api-error";
import { ApiResponce } from "../utils/api-responce";
import contactService from "../services/contact.services";
import { ContactInputSchema } from "../validators/Contact.types";

// list all contacts
export async function listContacts(req: Request, res: Response, next: NextFunction) {
    try {
        const contacts = await contactService.getAllContacts();
        return res.status(200).json(new ApiResponce(200, { contacts }, "list all contacts"));
    } catch (err) {
        next(err);
    }
}

// add new contact
export async function createContact(req: Request, res: Response, next: NextFunction) {
    try {
        const newContact = await contactService.addContact(req.body);
        res.status(201).json(new ApiResponce(201, { newContact }, "Contact created successfully"));
    } catch (err) {
        next(err);
    }
}

// delete contact
export async function removeContact(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            throw new ApiError(400, "Missing or invalid id");
        }
        const deleted = await contactService.deleteContact(id);
        if (!deleted) {
            throw new ApiError(404, "Contact not found");
        }
        res.status(202).json(new ApiResponce(202, {}, "deleted contact successfully"));
    } catch (err) {
        next(err);
    }
}
