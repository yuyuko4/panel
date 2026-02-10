import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className = '',
    variant = 'default',
    padding = 'md',
    hover = false,
    onClick
}: CardProps) {
    const baseClasses =
        'bg-bg-secondary rounded-xl shadow-md transition-all duration-250 ease-out animate-fade-in';

    const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
        default: 'border border-border',
        glass:
            'bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[12px]',
        bordered: 'bg-transparent border-2 border-border shadow-none',
    };

    const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
        none: 'p-0',
        sm: 'p-sm',
        md: 'p-lg',
        lg: 'p-xl',
    };

    const hoverClasses = hover
        ? 'hover:-translate-y-1 hover:shadow-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary'
        : '';

    return (
        <div
            className={[
                baseClasses,
                variantClasses[variant],
                paddingClasses[padding],
                hoverClasses,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`flex flex-col gap-xs pb-md ${className}`}>{children}</div>
    );
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return (
        <h3 className={`text-lg font-semibold text-text-primary leading-tight ${className}`}>
            {children}
        </h3>
    );
}

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return <p className={`text-sm text-text-secondary ${className}`}>{children}</p>;
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={className}>{children}</div>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`flex items-center gap-sm pt-md border-t border-border mt-md ${className}`}>
            {children}
        </div>
    );
}
