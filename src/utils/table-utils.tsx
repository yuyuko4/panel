
import React from 'react';
import { Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';

export class TableBuilder<T> {
    private columns: Column<T>[] = [];

    column(key: keyof T | string, header: string, options: Partial<Column<T>> = {}): this {
        this.columns.push({
            key,
            header,
            ...options,
        });
        return this;
    }

    text(key: keyof T | string, header: string, width?: string): this {
        return this.column(key, header, { width });
    }

    number(key: keyof T | string, header: string, format?: Intl.NumberFormatOptions): this {
        return this.column(key, header, {
            render: (value) => {
                if (typeof value === 'number') {
                    return new Intl.NumberFormat('en-US', format).format(value);
                }
                return String(value);
            }
        });
    }

    badge(
        key: keyof T | string,
        header: string,
        variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'>,
        width?: string
    ): this {
        return this.column(key, header, {
            width,
            render: (value) => {
                const variant = variants[String(value)] || 'default';
                return (
                    <Badge variant={variant}>
                        {String(value)}
                    </Badge>
                );
            }
        });
    }

    date(key: keyof T | string, header: string, format?: Intl.DateTimeFormatOptions): this {
        return this.column(key, header, {
            render: (value) => {
                if (!value) return '-';
                return new Date(String(value)).toLocaleDateString('en-US', format || {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });
            }
        });
    }

    image(key: keyof T | string, header: string, width: string = '50px'): this {
        return this.column(key, header, {
            width,
            sortable: false,
            render: (value) => (
                <img
                    src={String(value)}
                    alt={header}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}
                />
            )
        });
    }

    custom(key: keyof T | string, header: string, render: (row: T) => React.ReactNode): this {
        return this.column(key, header, {
            render: (_value, row) => render(row)
        });
    }

    build(): Column<T>[] {
        return this.columns;
    }
}

export function createTable<T>(): TableBuilder<T> {
    return new TableBuilder<T>();
}
