'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc.',
    });
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        weekly: true,
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
    };

    const themeOptionBase =
        'flex flex-col gap-sm rounded-xl border-2 border-border bg-bg-tertiary p-md transition-all duration-150 hover:border-text-muted';

    return (
        <div className="flex flex-col gap-xl">
            <div className="mb-md">
                <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
                <p className="mt-xs text-sm text-text-muted">Manage your account settings and preferences</p>
            </div>

            <div className="grid gap-lg [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] max-md:grid-cols-1">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-md">
                            <Input
                                label="Full Name"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                fullWidth
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                fullWidth
                            />
                            <Input
                                label="Company"
                                value={profile.company}
                                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                fullWidth
                            />
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave} loading={saving}>Save Changes</Button>
                    </CardFooter>
                </Card>

                {/* Appearance Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-md">
                            <button
                                className={`${themeOptionBase} ${theme === 'light' ? 'border-accent-primary bg-[rgba(99,102,241,0.05)]' : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                <div className="overflow-hidden rounded-lg">
                                    <div className="flex h-20 bg-[#f8fafc]">
                                        <div className="w-[30%] bg-black/10"></div>
                                        <div className="flex flex-1 items-start justify-center p-sm">
                                            <div className="h-10 w-[70%] rounded-sm bg-black/10"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="flex items-center justify-center gap-xs text-sm font-medium text-text-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                                    Light
                                </span>
                            </button>
                            <button
                                className={`${themeOptionBase} ${theme === 'dark' ? 'border-accent-primary bg-[rgba(99,102,241,0.05)]' : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                <div className="overflow-hidden rounded-lg">
                                    <div className="flex h-20 bg-[#0f172a]">
                                        <div className="w-[30%] bg-white/5"></div>
                                        <div className="flex flex-1 items-start justify-center p-sm">
                                            <div className="h-10 w-[70%] rounded-sm bg-white/10"></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="flex items-center justify-center gap-xs text-sm font-medium text-text-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                    Dark
                                </span>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Configure how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-sm">
                            <div className="flex items-center justify-between gap-md rounded-lg bg-bg-tertiary p-md">
                                <div className="flex flex-col gap-xs">
                                    <span className="text-sm font-medium text-text-primary">Email Notifications</span>
                                    <span className="text-xs text-text-muted">Receive email updates about your account</span>
                                </div>
                                <button
                                    className={`relative h-[26px] w-12 flex-shrink-0 rounded-full bg-bg-hover transition-colors duration-150 ${notifications.email ? 'bg-accent-gradient' : ''}`}
                                    onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                                    aria-label="Toggle email notifications"
                                >
                                    <span className={`absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${notifications.email ? 'translate-x-[22px]' : ''}`}></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-md rounded-lg bg-bg-tertiary p-md">
                                <div className="flex flex-col gap-xs">
                                    <span className="text-sm font-medium text-text-primary">Push Notifications</span>
                                    <span className="text-xs text-text-muted">Receive push notifications in your browser</span>
                                </div>
                                <button
                                    className={`relative h-[26px] w-12 flex-shrink-0 rounded-full bg-bg-hover transition-colors duration-150 ${notifications.push ? 'bg-accent-gradient' : ''}`}
                                    onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                                    aria-label="Toggle push notifications"
                                >
                                    <span className={`absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${notifications.push ? 'translate-x-[22px]' : ''}`}></span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-md rounded-lg bg-bg-tertiary p-md">
                                <div className="flex flex-col gap-xs">
                                    <span className="text-sm font-medium text-text-primary">Weekly Digest</span>
                                    <span className="text-xs text-text-muted">Get a weekly summary of activity</span>
                                </div>
                                <button
                                    className={`relative h-[26px] w-12 flex-shrink-0 rounded-full bg-bg-hover transition-colors duration-150 ${notifications.weekly ? 'bg-accent-gradient' : ''}`}
                                    onClick={() => setNotifications({ ...notifications, weekly: !notifications.weekly })}
                                    aria-label="Toggle weekly digest"
                                >
                                    <span className={`absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${notifications.weekly ? 'translate-x-[22px]' : ''}`}></span>
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-danger">
                    <CardHeader>
                        <CardTitle>Danger Zone</CardTitle>
                        <CardDescription>Irreversible and destructive actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-md">
                            <div className="flex items-center justify-between gap-md max-md:flex-col max-md:items-start">
                                <div>
                                    <span className="block text-sm font-medium text-text-primary">Delete Account</span>
                                    <span className="mt-xs block text-xs text-text-muted">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </span>
                                </div>
                                <Button variant="danger">Delete Account</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
