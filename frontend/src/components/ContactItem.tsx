import { Button } from "@/components/ui/button";
import type { Contact } from "@/lib/types";
import { Trash2 } from "lucide-react";

type Props = {
    contact: Contact;
    onDelete: (id: string) => void;
};

export default function ContactItem({ contact, onDelete }: Props) {
    return (
        <li className="flex items-center justify-between p-3 rounded-xl bg-accent/10 dark:bg-accent/20 shadow transition hover:scale-[1.02] animate-fade-in">
            <div>
                <div className="font-semibold">{contact.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{contact.email}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{contact.phone}</div>
            </div>
            <Button
                size="icon"
                variant="ghost"
                className="ml-2 text-red-500 hover:text-red-700"
                aria-label={`Delete ${contact.name}`}
                onClick={() => onDelete(contact.id)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </li>
    );
}
