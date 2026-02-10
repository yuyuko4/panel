'use client';

import React, { useState, useMemo } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './Card';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    width?: string;
    sortable?: boolean;
    render?: (value: any, row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    pageSize?: number;
    onRowClick?: (row: T, index: number) => void;
    emptyMessage?: string;
    actions?: (row: T, index: number) => React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

export function DataTable<T>({
    data,
    columns,
    searchable = true,
    searchPlaceholder = 'Search...',
    pageSize = 10,
    onRowClick,
    emptyMessage = 'No data found',
    actions,
    className = '',
    title,
    description
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter data based on search query
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;

        return data.filter(row =>
            Object.values(row as any).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [data, searchQuery]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = (a as any)[sortColumn];
            const bValue = (b as any)[sortColumn];

            if (aValue === bValue) return 0;

            const comparison = aValue < bValue ? -1 : 1;
            return sortDirection === 'asc' ? comparison : -comparison;
        });
    }, [filteredData, sortColumn, sortDirection]);

    // Paginate data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const getValue = (row: T, key: string) => {
        return (row as any)[key];
    };

    const tableContent = (
        <div className={`flex flex-col gap-md ${className}`}>
            {searchable && (
                <div className="flex flex-wrap items-center justify-between gap-md max-sm:flex-col max-sm:items-stretch">
                    <Input
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        leftIcon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        }
                        className="min-w-[280px] max-sm:min-w-0 max-sm:w-full"
                    />
                    <div className="text-sm text-text-muted">
                        {sortedData.length} results
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-border bg-bg-secondary">
                <table className="w-full border-collapse">
                    <thead className="bg-bg-tertiary">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className={[
                                        'whitespace-nowrap border-b border-border px-md py-md text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-secondary',
                                        column.sortable !== false
                                            ? 'cursor-pointer select-none transition-colors duration-150 hover:text-text-primary'
                                            : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    style={{ width: column.width }}
                                    onClick={() => column.sortable !== false && handleSort(String(column.key))}
                                >
                                    <span className="flex items-center gap-xs">
                                        {column.header}
                                        {column.sortable !== false && sortColumn === String(column.key) && (
                                            <span className="text-accent-primary">
                                                {sortDirection === 'asc' ? 'â†‘' : 'â†“'}
                                            </span>
                                        )}
                                    </span>
                                </th>
                            ))}
                            {actions && (
                                <th
                                    className="whitespace-nowrap border-b border-border px-md py-md text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-secondary"
                                    style={{ width: '100px' }}
                                >
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light">
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="py-2xl text-center text-sm text-text-muted"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={[
                                        'transition-colors duration-150 hover:bg-bg-hover',
                                        onRowClick ? 'cursor-pointer' : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onClick={() => onRowClick?.(row, index)}
                                >
                                    {columns.map((column) => (
                                        <td key={String(column.key)} className="px-md py-md text-sm text-text-primary">
                                            {column.render
                                                ? column.render(getValue(row, String(column.key)), row, index)
                                                : String(getValue(row, String(column.key)) ?? '')}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td
                                            className="px-md py-md text-sm text-text-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {actions(row, index)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-sm pt-md">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        â† Previous
                    </Button>
                    <div className="flex items-center gap-xs">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum: number;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    className={[
                                        'flex h-9 min-w-[36px] items-center justify-center rounded-md border border-border text-sm font-medium text-text-secondary transition-all duration-150 hover:border-accent-primary hover:bg-bg-tertiary hover:text-accent-primary',
                                        currentPage === pageNum
                                            ? 'border-transparent bg-accent-gradient text-white'
                                            : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next â†’
                    </Button>
                </div>
            )}
        </div>
    );

    if (title) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
                <CardContent>
                    {tableContent}
                </CardContent>
            </Card>
        );
    }

    return tableContent;
}
