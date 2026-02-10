import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
    children: React.ReactNode;
}

export function Badge({
    variant = 'default',
    className = '',
    children,
    ...props
}: BadgeProps) {
    const baseClasses =
        'inline-flex items-center px-2 py-[2px] rounded-full text-xs font-medium leading-[1.5] whitespace-nowrap';

    const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
        default: 'bg-bg-tertiary text-text-secondary',
        success: 'bg-success-bg text-success',
        warning: 'bg-warning-bg text-warning',
        danger: 'bg-danger-bg text-danger',
        info: 'bg-info-bg text-info',
        outline: 'bg-transparent border border-border text-text-secondary',
    };

    return (
        <span
            className={[baseClasses, variantClasses[variant], className].filter(Boolean).join(' ')}
            {...props}
        >
            {children}
        </span>
    );
}
