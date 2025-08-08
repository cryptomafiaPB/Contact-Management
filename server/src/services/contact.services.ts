import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Contact, ContactInput, ContactInputSchema, ContactSchema } from "../validators/Contact.types";

const DATA_FILE = path.join(__dirname, "../data/contacts.json");

class ContactService {
    async readContacts(): Promise<Contact[]> {
        try {
            const raw = await fs.readFile(DATA_FILE, "utf-8");
            const list = JSON.parse(raw);
            return Array.isArray(list)
                ? list.filter((c) => ContactSchema.safeParse(c).success)
                : [];
        } catch (err) {
            throw new Error("Could not read contacts file");
        }
    }

    async addContacts(list: Contact[]): Promise<void> {
        // console.log("Inside add contacts")
        const tmpPath = DATA_FILE + ".tmp";
        await fs.writeFile(tmpPath, JSON.stringify(list, null, 2));
        await fs.rename(tmpPath, DATA_FILE);
    }

    async getAllContacts(): Promise<Contact[]> {
        // console.log("Inside get all")
        return await this.readContacts();
    }

    async addContact(input: ContactInput): Promise<Contact> {
        // Validate input (already checked in controller; redundant here for safety)
        const valid = ContactInputSchema.parse(input);

        const now = new Date().toISOString();
        const contact: Contact = {
            ...valid,
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
        };

        const contacts = await this.readContacts();
        contacts.push(contact);
        await this.addContacts(contacts);

        return contact;
    }

    async deleteContact(id: string): Promise<boolean> {
        const contacts = await this.readContacts();
        console.log(contacts)
        const index = contacts.findIndex((c) => c.id === id);
        if (index === -1) return false;
        contacts.splice(index, 1);
        await this.addContacts(contacts);
        return true;
    }
}

const contactService = new ContactService();
export default contactService;  
