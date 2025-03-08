"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '@/components/Sidebar';
import { AuthProvider } from '@/components/AuthContext';

export default function CustomLayout({ children }) {

    return (
        <AuthProvider>
            <div className="flex flex-col m-[max(5px,min(3dvw,100px))]">
                <Header />
                <div className="mt-5 flex gap-5">
                    <Sidebar />
                    {children}
                </div>
            </div>
        </AuthProvider>
    );
}
