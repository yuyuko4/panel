'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Input } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import styles from './page.module.css';

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

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Settings</h1>
                <p className={styles.subtitle}>Manage your account settings and preferences</p>
            </div>

            <div className={styles.grid}>
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className={styles.form}>
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
                        <div className={styles.themeSelector}>
                            <button
                                className={`${styles.themeOption} ${theme === 'light' ? styles.active : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                <div className={styles.themePreview}>
                                    <div className={styles.themePreviewLight}>
                                        <div className={styles.previewSidebar}></div>
                                        <div className={styles.previewContent}>
                                            <div className={styles.previewCard}></div>
                                        </div>
                                    </div>
                                </div>
                                <span className={styles.themeLabel}>
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
                                className={`${styles.themeOption} ${theme === 'dark' ? styles.active : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                <div className={styles.themePreview}>
                                    <div className={styles.themePreviewDark}>
                                        <div className={styles.previewSidebar}></div>
                                        <div className={styles.previewContent}>
                                            <div className={styles.previewCard}></div>
                                        </div>
                                    </div>
                                </div>
                                <span className={styles.themeLabel}>
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
                        <div className={styles.toggleList}>
                            <div className={styles.toggleItem}>
                                <div className={styles.toggleInfo}>
                                    <span className={styles.toggleTitle}>Email Notifications</span>
                                    <span className={styles.toggleDescription}>Receive email updates about your account</span>
                                </div>
                                <button
                                    className={`${styles.toggle} ${notifications.email ? styles.toggleOn : ''}`}
                                    onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                                    aria-label="Toggle email notifications"
                                >
                                    <span className={styles.toggleThumb}></span>
                                </button>
                            </div>
                            <div className={styles.toggleItem}>
                                <div className={styles.toggleInfo}>
                                    <span className={styles.toggleTitle}>Push Notifications</span>
                                    <span className={styles.toggleDescription}>Receive push notifications in your browser</span>
                                </div>
                                <button
                                    className={`${styles.toggle} ${notifications.push ? styles.toggleOn : ''}`}
                                    onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                                    aria-label="Toggle push notifications"
                                >
                                    <span className={styles.toggleThumb}></span>
                                </button>
                            </div>
                            <div className={styles.toggleItem}>
                                <div className={styles.toggleInfo}>
                                    <span className={styles.toggleTitle}>Weekly Digest</span>
                                    <span className={styles.toggleDescription}>Get a weekly summary of activity</span>
                                </div>
                                <button
                                    className={`${styles.toggle} ${notifications.weekly ? styles.toggleOn : ''}`}
                                    onClick={() => setNotifications({ ...notifications, weekly: !notifications.weekly })}
                                    aria-label="Toggle weekly digest"
                                >
                                    <span className={styles.toggleThumb}></span>
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className={styles.dangerCard}>
                    <CardHeader>
                        <CardTitle>Danger Zone</CardTitle>
                        <CardDescription>Irreversible and destructive actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.dangerZone}>
                            <div className={styles.dangerItem}>
                                <div>
                                    <span className={styles.dangerTitle}>Delete Account</span>
                                    <span className={styles.dangerDescription}>
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
