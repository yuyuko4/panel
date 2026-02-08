'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import styles from './AdminLayout.module.css';

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
        <div className={styles.layout}>
            <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <Header sidebarCollapsed={sidebarCollapsed} onMenuClick={toggleMobileSidebar} />
            <main
                className={styles.main}
                style={{
                    marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
                }}
            >
                <div className={styles.content}>{children}</div>
            </main>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className={styles.overlay} onClick={toggleMobileSidebar} />
            )}
        </div>
    );
}
