'use client';

import React from 'react';
import { AdminContextProvider, NavRoute, AdminUser } from '@/context/AdminContext';
import { AdminLayout } from '@/components/layout/AdminLayout';

interface AdminProviderProps {
    children: React.ReactNode;
    routes: NavRoute[];
    apiUrl: string;
    initialAdmin?: AdminUser | null;
}

export function AdminProvider({ children, routes, apiUrl, initialAdmin }: AdminProviderProps) {
    return (
        <AdminContextProvider routes={routes} apiUrl={apiUrl} initialAdmin={initialAdmin}>
            <AdminLayout>
                {children}
            </AdminLayout>
        </AdminContextProvider>
    );
}

export type { NavRoute, AdminUser };
