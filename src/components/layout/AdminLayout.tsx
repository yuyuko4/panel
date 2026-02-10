'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-bg-primary">
            <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <Header sidebarCollapsed={sidebarCollapsed} onMenuClick={toggleMobileSidebar} />
            <main
                className="min-h-screen pt-[var(--header-height)] transition-[margin-left] duration-250 max-md:!ml-0"
                style={{
                    marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
                }}
            >
                <div className="animate-fade-in p-xl max-md:p-md">{children}</div>
            </main>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-[90] hidden bg-black/50 max-md:block"
                    onClick={toggleMobileSidebar}
                />
            )}
        </div>
    );
}
