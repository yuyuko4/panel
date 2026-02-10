'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import styles from './Sidebar.module.css';

interface SidebarProps {
    collapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const { routes } = useAdmin();

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        <line x1="12" y1="22" x2="12" y2="15.5" />
                        <polyline points="22 8.5 12 15.5 2 8.5" />
                    </svg>
                </div>
                {!collapsed && <span className={styles.logoText}>Admin Panel</span>}
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {routes.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                    onMouseEnter={() => setHoveredItem(item.href)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    {!collapsed && (
                                        <>
                                            <span className={styles.navLabel}>{item.label}</span>
                                            {item.badge && (
                                                <span className={styles.navBadge}>{item.badge}</span>
                                            )}
                                        </>
                                    )}
                                    {collapsed && hoveredItem === item.href && (
                                        <span className={styles.tooltip}>{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.footer}>
                <button className={styles.collapseButton} onClick={onToggle}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}
