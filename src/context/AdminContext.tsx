"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AdminUser {
    id: string | number;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
}

export interface NavRoute {
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
}

interface AdminContextType {
    routes: NavRoute[];
    apiUrl: string;
    admin: AdminUser | null;
    setAdmin: (admin: AdminUser | null) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}

interface AdminProviderProps {
    children: ReactNode;
    routes: NavRoute[];
    apiUrl: string;
    initialAdmin?: AdminUser | null;
}

export function AdminContextProvider({ children, routes, apiUrl, initialAdmin = null }: AdminProviderProps) {
    const [admin, setAdmin] = useState<AdminUser | null>(initialAdmin);

    return (
        <AdminContext.Provider value={{ routes, apiUrl, admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}
