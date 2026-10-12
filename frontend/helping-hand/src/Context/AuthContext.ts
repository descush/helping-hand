import { User } from "firebase/auth";
import { createContext } from "react";

export interface AuthContextModel {
    user: User | null;
    authReady: boolean; // false until Firebase reports the initial sign-in state
}

const defaultValue: AuthContextModel = {
    user: null,
    authReady: false
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
