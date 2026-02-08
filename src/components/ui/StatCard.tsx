import React from 'react';
import styles from './StatCard.module.css';

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
        <div className={`${styles.card} ${styles[variant]} ${className}`}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                {icon && <span className={styles.icon}>{icon}</span>}
            </div>
            <div className={styles.value}>{value}</div>
            {trend && (
                <div className={`${styles.trend} ${isTrendPositive ? styles.trendUp : styles.trendDown}`}>
                    <span className={styles.trendIcon}>
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
                    <span className={styles.trendValue}>
                        {isTrendPositive ? '+' : ''}{trend.value}%
                    </span>
                    <span className={styles.trendLabel}>{trend.label}</span>
                </div>
            )}
        </div>
    );
}
