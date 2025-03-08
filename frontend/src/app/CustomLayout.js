"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '@/components/Sidebar';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function CustomLayout({ children }) {
    const [user, setUser] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    onAuthStateChanged(auth, (authUser) => {
        console.log(authUser)
        setUser(authUser)
    })

    return (
        <div className="flex flex-col m-[max(5px,min(3dvw,100px))]">
            <Header user={user} />
            <div className="mt-5 flex gap-5">
                <Sidebar
                    user={user}
                    setUser={setUser}
                    collapsed={collapsed}
                    toggleSidebar={() => { setCollapsed(!collapsed) }}
                />
                {children}
            </div>
        </div>
    );
}
