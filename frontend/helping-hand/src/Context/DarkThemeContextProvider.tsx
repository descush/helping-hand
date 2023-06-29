import { ReactNode, useState } from "react";
import { DarkThemeContext } from "./DarkThemeContext";


interface Props {
    children: ReactNode; // Children components passed to the provider
}

export function DarkThemeContextProvider({ children }: Props) {
    const [darkTheme, setDarkTheme] = useState(false);

    function toggleDarkTheme() {
        setDarkTheme(darkTheme => !darkTheme);
    }

    return (
        <DarkThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    )
}
