import { createContext } from "react";

export const DarkThemeContext = createContext({
    darkTheme: true,
    toggleDarkTheme: () => { },
});