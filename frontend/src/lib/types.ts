export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}
export type ContactInput = Omit<Contact, "id" | "createdAt" | "updatedAt">;
