import React from 'react';
import styles from './Badge.module.css';

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
    return (
        <span
            className={`${styles.badge} ${styles[`variant-${variant}`]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
