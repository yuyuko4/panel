'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

interface SidebarProps {
    collapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const { routes } = useAdmin();

    return (
        <aside
            className={[
                'fixed bottom-0 left-0 top-0 z-[100] flex w-[var(--sidebar-width)] flex-col border-r border-border bg-bg-secondary transition-[width] duration-250 max-md:-translate-x-full max-md:transition-transform',
                collapsed ? 'w-[var(--sidebar-collapsed-width)]' : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <div className="flex h-[var(--header-height)] items-center gap-md border-b border-border p-lg">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-gradient text-white">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        <line x1="12" y1="22" x2="12" y2="15.5" />
                        <polyline points="22 8.5 12 15.5 2 8.5" />
                    </svg>
                </div>
                {!collapsed && <span className="whitespace-nowrap text-lg font-bold text-text-primary">Admin Panel</span>}
            </div>

            <nav className="flex-1 overflow-y-auto p-md">
                <ul className="flex flex-col gap-xs">
                    {routes.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        const activeClasses = isActive
                            ? 'bg-[rgba(99,102,241,0.1)] text-accent-primary before:absolute before:left-0 before:top-1/2 before:h-[60%] before:w-[3px] before:-translate-y-1/2 before:rounded-r-full before:bg-accent-gradient before:content-[\'\']'
                            : '';

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={[
                                        'relative flex items-center gap-md rounded-lg px-md py-sm text-text-secondary transition-all duration-150 hover:bg-bg-tertiary hover:text-text-primary',
                                        activeClasses,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onMouseEnter={() => setHoveredItem(item.href)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">{item.icon}</span>
                                    {!collapsed && (
                                        <>
                                            <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
                                            {item.badge && (
                                                <span className="ml-auto rounded-full bg-accent-gradient px-2 py-[2px] text-xs font-semibold text-white">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                    {collapsed && hoveredItem === item.href && (
                                        <span className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-text-primary px-sm py-xs text-sm font-medium text-text-inverse animate-tooltip-in after:absolute after:-left-1 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rotate-45 after:bg-text-primary after:content-['']">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
{/* 
SIDEBAR COLLAPSE BUTTON
            <div className="border-t border-border p-md">
                <button
                    className="flex h-10 w-full items-center justify-center rounded-lg bg-bg-tertiary text-text-muted transition-all duration-150 hover:bg-bg-hover hover:text-text-primary"
                    onClick={onToggle}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
                        className="transition-transform duration-250"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div> */}
        </aside>
    );
}
