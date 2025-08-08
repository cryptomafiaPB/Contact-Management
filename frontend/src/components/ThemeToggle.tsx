"use client";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <div className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            <Switch checked={dark} onCheckedChange={setDark} aria-label="Toggle dark mode" />
            <Moon className="w-4 h-4" />
        </div>
    );
}
