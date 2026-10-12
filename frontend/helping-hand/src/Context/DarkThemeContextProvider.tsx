import { ReactNode, useEffect, useState } from "react";
import { DarkThemeContext } from "./DarkThemeContext";


interface Props {
    children: ReactNode; // Children components passed to the provider
}

function getInitialTheme(): boolean {
    try {
        const saved = localStorage.getItem("darkTheme");
        if (saved !== null) return saved === "true";
    } catch { }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function DarkThemeContextProvider({ children }: Props) {
    const [darkTheme, setDarkTheme] = useState(getInitialTheme);

    // Apply the theme to the whole page and remember the choice
    useEffect(() => {
        document.documentElement.dataset.theme = darkTheme ? "dark" : "light";
        try {
            localStorage.setItem("darkTheme", String(darkTheme));
        } catch { }
    }, [darkTheme]);

    function toggleDarkTheme() {
        setDarkTheme(darkTheme => !darkTheme);
    }

    return (
        <DarkThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    )
}
