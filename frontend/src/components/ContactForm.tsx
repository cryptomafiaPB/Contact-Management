"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ContactInput } from "@/lib/types";
import { toast } from "sonner";

type Props = {
    onContactCreated: (input: ContactInput) => Promise<void>;
};

const blank: ContactInput = { name: "", email: "", phone: "" };

export default function ContactForm({ onContactCreated }: Props) {
    const [values, setValues] = useState<ContactInput>(blank);
    const [busy, setBusy] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true);
        try {
            if (!values.name.trim()) throw new Error("Name required");
            if (!values.email.match(/^\S+@\S+\.\S+$/)) throw new Error("Invalid email");
            if (!values.phone.match(/^\+?\d{8,15}$/)) throw new Error("Phone 8-15 digits, may begin +");
            await onContactCreated({ ...values, name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim() });
            toast("Contact added!");
            setValues(blank);
        } catch (err: any) {
            toast(err?.message || "Failed to add contact");
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 animate-fade-in" autoComplete="off">
            <Input placeholder="Name" value={values.name} maxLength={100} disabled={busy}
                onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))} autoFocus required
            />
            <Input placeholder="Email" type="email" value={values.email} maxLength={100} disabled={busy}
                onChange={(e) => setValues(v => ({ ...v, email: e.target.value }))} required
            />
            <Input placeholder="Phone" value={values.phone} maxLength={15} pattern="^\+?\d{8,15}$" inputMode="tel" disabled={busy}
                onChange={(e) => setValues(v => ({ ...v, phone: e.target.value }))} required
            />
            <Button disabled={busy} className="mt-1">{busy ? "Adding..." : "Add Contact"}</Button>
        </form>
    );
}
