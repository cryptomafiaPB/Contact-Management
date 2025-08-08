import { Router } from "express";
import {
    listContacts,
    createContact,
    removeContact,
} from "../controllers/contact.controller";
import { ContactInputSchema } from "../validators/Contact.types";
const router = Router();

// /api/v1/contacts
router.get("/", listContacts);

// /api/v1/contacts
router.post(
    "/",
    createContact
);

// /api/v1/contacts/:id
router.delete("/:id", removeContact);

export default router;
