"use client";

import {
    createContext,
    useContext,
    useState,
} from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
    });

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}