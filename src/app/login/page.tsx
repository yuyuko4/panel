'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo: accept any credentials
        if (email && password) {
            window.location.href = '/dashboard';
        } else {
            setError('Please enter your email and password');
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-lg">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,_#0f172a_0%,_#1e1b4b_50%,_#0f172a_100%)]"></div>
            <div
                className="absolute -right-[200px] -top-[200px] h-[600px] w-[600px] rounded-full bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] opacity-50 blur-[80px] animate-float"
                style={{ animationDelay: '0s' }}
            ></div>
            <div
                className="absolute -bottom-[100px] -left-[100px] h-[400px] w-[400px] rounded-full bg-[linear-gradient(135deg,#ec4899,#8b5cf6)] opacity-50 blur-[80px] animate-float"
                style={{ animationDelay: '-5s' }}
            ></div>
            <div
                className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,#06b6d4,#6366f1)] opacity-50 blur-[80px] animate-float"
                style={{ animationDelay: '-10s' }}
            ></div>

            <Card variant="glass" padding="none" className="w-full max-w-[420px] p-2xl animate-slide-in-up">
                <div className="mb-xl text-center">
                    <div className="mb-md inline-flex h-16 w-16 items-center justify-center rounded-xl bg-accent-gradient text-white">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                            <line x1="12" y1="22" x2="12" y2="15.5" />
                            <polyline points="22 8.5 12 15.5 2 8.5" />
                        </svg>
                    </div>
                    <h1 className="mb-xs text-2xl font-bold text-text-primary">Welcome back</h1>
                    <p className="text-sm text-text-muted">Sign in to your admin account</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                    {error && (
                        <div className="flex items-center gap-sm rounded-lg bg-danger-bg px-md py-sm text-sm text-danger">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        leftIcon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        }
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        leftIcon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        }
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-xs text-text-secondary">
                            <input type="checkbox" className="h-4 w-4 accent-accent-primary" />
                            <span>Remember me</span>
                        </label>
                        <Link href="#" className="text-accent-primary hover:text-accent-primary-hover hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" fullWidth loading={loading} size="lg">
                        Sign in
                    </Button>
                </form>

                <div className="mt-xl border-t border-border pt-lg text-center">
                    <p className="text-sm text-text-muted">
                        Don&apos;t have an account?{' '}
                        <Link href="#" className="font-medium text-accent-primary hover:text-accent-primary-hover hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
