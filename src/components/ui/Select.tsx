import React, { forwardRef } from 'react';
import styles from './Select.module.css';

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

    return (
        <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
            {label && (
                <label htmlFor={selectId} className={styles.label}>
                    {label}
                </label>
            )}
            <div className={`${styles.selectWrapper} ${error ? styles.hasError : ''}`}>
                <select
                    ref={ref}
                    id={selectId}
                    className={styles.select}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <span className={styles.error}>{error}</span>}
            {hint && !error && <span className={styles.hint}>{hint}</span>}
        </div>
    );
});

Select.displayName = 'Select';
