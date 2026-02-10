import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    id,
    ...props
}, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const wrapperClasses = [
        'flex flex-col gap-xs',
        fullWidth ? 'w-full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const inputClasses = [
        'w-full px-md py-sm text-sm text-text-primary bg-bg-secondary border border-border rounded-lg outline-none transition-all duration-150 placeholder:text-text-muted focus:border-accent-primary focus:ring-4 focus:ring-[rgba(99,102,241,0.15)] disabled:bg-bg-tertiary disabled:text-text-muted disabled:cursor-not-allowed',
        leftIcon ? 'pl-10' : '',
        rightIcon ? 'pr-10' : '',
        error ? 'border-danger focus:border-danger focus:ring-[rgba(239,68,68,0.15)]' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={wrapperClasses}>
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {leftIcon && (
                    <span className="pointer-events-none absolute left-3 flex items-center justify-center text-text-muted">
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={inputClasses}
                    {...props}
                />
                {rightIcon && (
                    <span className="pointer-events-none absolute right-3 flex items-center justify-center text-text-muted">
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && <span className="text-xs text-danger">{error}</span>}
            {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
        </div>
    );
});

Input.displayName = 'Input';
