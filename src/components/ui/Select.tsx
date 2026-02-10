"use client"
import React, { forwardRef } from 'react';

export interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    hint,
    options,
    fullWidth = false,
    className = '',
    id,
    ...props
}, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const wrapperClasses = [
        'flex flex-col gap-xs',
        fullWidth ? 'w-full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const selectClasses = [
        'w-full px-md py-sm pr-8 text-sm text-text-primary bg-bg-secondary border border-border rounded-lg outline-none transition-all duration-150 appearance-none cursor-pointer focus:border-accent-primary focus:ring-4 focus:ring-[rgba(99,102,241,0.15)] disabled:bg-bg-tertiary disabled:text-text-muted disabled:cursor-not-allowed',
        error ? 'border-danger focus:border-danger focus:ring-[rgba(239,68,68,0.15)]' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={wrapperClasses}>
            {label && (
                <label htmlFor={selectId} className="text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}
            <div className="relative flex items-center after:pointer-events-none after:absolute after:right-3 after:top-1/2 after:h-2.5 after:w-2.5 after:-translate-y-1/2 after:content-[''] ">
                <select
                    ref={ref}
                    id={selectId}
                    className={selectClasses}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <span className="text-xs text-danger">{error}</span>}
            {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
        </div>
    );
});

Select.displayName = 'Select';
