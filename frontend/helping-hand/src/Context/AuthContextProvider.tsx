import { ReactNode, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AuthContext from './AuthContext';

function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        return auth.onAuthStateChanged(newUser => {
            setUser(newUser);
            setAuthReady(true);
        })
    }, []);

    return (
        <AuthContext.Provider value={{ user, authReady }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
