
import { useState, useCallback } from 'react';

export function useFormModal<T = any>(defaultData?: Partial<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingData, setEditingData] = useState<T | null>(null);

    const openAdd = useCallback((data?: Partial<T>) => {
        setEditingData((data || defaultData || null) as T | null);
        setIsOpen(true);
    }, [defaultData]);

    const openEdit = useCallback((data: T) => {
        setEditingData(data);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setEditingData(null);
    }, []);

    return {
        isOpen,
        editingData,
        openAdd,
        openEdit,
        close
    };
}
