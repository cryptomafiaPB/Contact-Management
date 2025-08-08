import type { Contact } from "@/lib/types";
import ContactItem from "./ContactItem";

type Props = {
    contacts: Contact[];
    onDelete: (id: string) => void;
};

export default function ContactList({ contacts, onDelete }: Props) {
    console.log("ContactList received contacts:", contacts);
    console.log("Contacts length:", contacts.length);
    console.log("Contacts type:", typeof contacts);
    console.log("Is array:", Array.isArray(contacts));

    if (!contacts || contacts.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-8 animate-fade-in">
                No contacts yet. Add one above!
            </div>
        );
    }

    return (
        <ul className="space-y-4 mt-6">
            {contacts.map((c) => (
                <ContactItem key={c.id} contact={c} onDelete={onDelete} />
            ))}
        </ul>
    );
}
