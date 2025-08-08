import { Router } from "express";
import {
    listContacts,
    createContact,
    removeContact,
} from "../controllers/contact.controller";
import { ContactInputSchema } from "../validators/Contact.types";
import { validateRequest } from "../middlewares/validateRequest";
const router = Router();

// /api/v1/contacts
router.get("/", listContacts);

// /api/v1/contacts
router.post(
    "/",
    validateRequest(ContactInputSchema),
    createContact
);

// /api/v1/contacts/:id
router.delete("/:id", removeContact);

export default router;
