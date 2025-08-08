"use client";
import { useCallback, useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { getContacts, addContact, deleteContact } from "@/lib/api";
import type { Contact, ContactInput } from "@/lib/types";
import { toast } from "sonner";

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getContacts()
      .then(setContacts)
      .catch((e) => toast(e.message))
      .finally(() => setLoading(false));
  }, []);

  const onContactCreated = useCallback(async (input: ContactInput) => {
    const contact = await addContact(input);
    setContacts((prev) => [contact, ...prev]);
  }, []);

  const onDelete = useCallback(async (id: string) => {
    setContacts((prev) => prev.filter(c => c.id !== id));
    try {
      await deleteContact(id);
      toast("Contact deleted");
    } catch (err: any) {
      toast(err?.message || "Failed to delete contact");
      setContacts(await getContacts());
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="h-16 w-full flex items-center justify-end top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full md:max-w-lg p-4 sm:p-8 rounded-xl bg-white/80 dark:bg-black/80 shadow-md backdrop-blur-xl transition-colors duration-500">
        <h1 className="text-4xl font-bold text-center mb-4 tracking-tight dark:text-gray-50">Contact Management</h1>
        <ContactForm onContactCreated={onContactCreated} />
        {loading ? (
          <div className="animate-pulse space-y-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 rounded bg-accent/20 w-full" />
            ))}
          </div>
        ) : (
          <ContactList contacts={contacts} onDelete={onDelete} />
        )}
      </div>
    </main>
  );
}
