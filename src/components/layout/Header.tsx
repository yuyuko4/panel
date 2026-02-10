'use client';

import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useAdmin } from '@/context/AdminContext';
import { Input } from '../ui/Input';

interface HeaderProps {
    sidebarCollapsed?: boolean;
    onMenuClick?: () => void;
}

export function Header({ sidebarCollapsed, onMenuClick }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const { admin } = useAdmin();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const iconButtonBase =
        'relative flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-all duration-150 hover:bg-bg-tertiary hover:text-text-primary';

    return (
        <header
            className="fixed left-0 right-0 top-0 z-50 flex h-[var(--header-height)] items-center justify-between border-b border-border bg-bg-secondary px-lg transition-[margin-left] duration-250 max-md:!ml-0"
            style={{
                marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
            }}
        >
            <div className="flex items-center gap-md">
                <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-all duration-150 hover:bg-bg-tertiary hover:text-text-primary max-md:flex" onClick={onMenuClick}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <div className="w-80 max-md:hidden">
                    <Input
                        placeholder="Search anything..."
                        leftIcon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        }
                    />
                </div>
            </div>

            <div className="flex items-center gap-sm">
                {/* Theme Toggle */}
                <button className={iconButtonBase} onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        className={`${iconButtonBase} after:absolute after:right-2.5 after:top-2.5 after:h-2 after:w-2 after:rounded-full after:border-2 after:border-bg-secondary after:bg-danger after:content-['']`}
                        onClick={() => setShowNotifications(!showNotifications)}
                        aria-label="Notifications"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 top-full z-[100] mt-2 min-w-[260px] overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-xl animate-slide-in-down">
                            <div className="flex items-center justify-between border-b border-border p-md">
                                <span className="text-sm font-semibold text-text-primary">Notifications</span>
                                <button className="text-xs font-medium text-accent-primary hover:underline">Mark all read</button>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="flex cursor-pointer items-start gap-sm p-md transition-colors duration-150 hover:bg-bg-tertiary">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[rgba(99,102,241,0.1)] text-accent-primary">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-text-primary">New user registered</p>
                                        <span className="text-xs text-text-muted">2 min ago</span>
                                    </div>
                                </div>
                                <div className="flex cursor-pointer items-start gap-sm p-md transition-colors duration-150 hover:bg-bg-tertiary">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[rgba(99,102,241,0.1)] text-accent-primary">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1="3" y1="6" x2="21" y2="6" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-text-primary">New order received</p>
                                        <span className="text-xs text-text-muted">10 min ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative">
                    <button
                        className="flex items-center gap-sm rounded-full border border-border bg-transparent px-sm py-xs text-text-secondary transition-all duration-150 hover:border-bg-hover hover:bg-bg-tertiary"
                        onClick={() => setShowProfile(!showProfile)}
                        aria-label="Profile menu"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gradient text-xs font-semibold text-white">
                            {admin?.avatar ? (
                                <img src={admin.avatar} alt={admin.name} className="h-full w-full rounded-full object-cover" />
                            ) : (
                                <span>{admin?.name?.substring(0, 2).toUpperCase() || 'AD'}</span>
                            )}
                        </div>
                        <span className="text-sm font-medium text-text-primary max-md:hidden">
                            {admin?.name || 'Admin'}
                        </span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                    {showProfile && (
                        <div className="absolute right-0 top-full z-[100] mt-2 min-w-[260px] overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-xl animate-slide-in-down">
                            <a href="#" className="flex items-center gap-sm px-md py-sm text-sm text-text-secondary transition-all duration-150 hover:bg-bg-tertiary hover:text-text-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Profile
                            </a>
                            <a href="/settings" className="flex items-center gap-sm px-md py-sm text-sm text-text-secondary transition-all duration-150 hover:bg-bg-tertiary hover:text-text-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                Settings
                            </a>
                            <div className="my-xs h-px bg-border"></div>
                            <a href="/login" className="flex items-center gap-sm px-md py-sm text-sm text-danger transition-all duration-150 hover:bg-danger-bg">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Log out
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
