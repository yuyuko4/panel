import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseClasses =
        'inline-flex items-center justify-center gap-sm font-medium rounded-lg transition-all duration-150 ease-out cursor-pointer whitespace-nowrap relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary';

    const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
        sm: 'px-sm py-xs text-sm min-h-8',
        md: 'px-md py-sm text-sm min-h-10',
        lg: 'px-lg py-md text-base min-h-12',
    };

    const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary:
            'bg-accent-gradient text-text-inverse shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] active:translate-y-0',
        secondary:
            'bg-bg-tertiary text-text-primary border border-border hover:bg-bg-hover',
        danger:
            'bg-danger text-white shadow-[0_4px_14px_rgba(239,68,68,0.4)] hover:bg-[#dc2626] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] active:translate-y-0',
        ghost:
            'bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
        outline:
            'bg-transparent text-accent-primary border-2 border-accent-primary hover:bg-accent-primary hover:text-text-inverse',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const buttonClasses = [
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        widthClass,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={buttonClasses}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="inline-flex items-center justify-center">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="opacity-100"
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            ) : (
                <>
                    {leftIcon && <span className="inline-flex items-center justify-center text-[1.1em]">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="inline-flex items-center justify-center text-[1.1em]">{rightIcon}</span>}
                </>
            )}
        </button>
    );
}
