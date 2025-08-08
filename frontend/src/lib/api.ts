import type { Contact, ContactInput } from "./types";

const BASE = process.env.NEXT_PUBLIC_CONTACT_API_BASE ?? "http://localhost:4000/api/v1/contacts";

export async function getContacts(): Promise<Contact[]> {
    const res = await fetch(BASE, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("Failed to fetch contacts");
    const data = await res.json();
    console.log("API Response:", data);
    return data.data?.contacts || [];
}

export async function addContact(input: ContactInput): Promise<Contact> {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? "Failed to add contact");
    return data.data?.newContact;
}

export async function deleteContact(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to delete contact");
    }
}
