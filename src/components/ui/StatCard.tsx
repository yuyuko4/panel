import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        label: string;
    };
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    className?: string;
}

export function StatCard({
    title,
    value,
    icon,
    trend,
    variant = 'default',
    className = ''
}: StatCardProps) {
    const isTrendPositive = trend && trend.value >= 0;

    return (
        <div
            className={[
                'rounded-xl border border-border bg-bg-secondary p-lg transition-all duration-250 ease-out animate-slide-in-up hover:-translate-y-1 hover:shadow-lg',
                variant === 'primary' ? 'border-l-4 border-l-[var(--color-accent-primary)]' : '',
                variant === 'success' ? 'border-l-4 border-l-[var(--color-success)]' : '',
                variant === 'warning' ? 'border-l-4 border-l-[var(--color-warning)]' : '',
                variant === 'danger' ? 'border-l-4 border-l-[var(--color-danger)]' : '',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <div className="mb-sm flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.05em] text-text-secondary">
                    {title}
                </span>
                {icon && (
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gradient text-white">
                        {icon}
                    </span>
                )}
            </div>
            <div className="mb-sm text-3xl font-bold leading-tight text-text-primary">{value}</div>
            {trend && (
                <div
                    className={[
                        'flex items-center gap-xs text-sm',
                        isTrendPositive ? 'text-success' : 'text-danger',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                >
                    <span className="flex items-center">
                        {isTrendPositive ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17l5-5 5 5M7 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 7l5 5 5-5M7 17l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </span>
                    <span className="font-semibold">
                        {isTrendPositive ? '+' : ''}{trend.value}%
                    </span>
                    <span className="text-text-muted">{trend.label}</span>
                </div>
            )}
        </div>
    );
}
