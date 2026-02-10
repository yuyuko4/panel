
import { useState, useCallback } from 'react';

export function useCrud<T extends { id: number | string }>(initialData: T[] = []) {
    const [items, setItems] = useState<T[]>(initialData);

    const handleSave = useCallback((data: Partial<T>, id?: number | string) => {
        if (id) {
            // Update existing
            setItems(prevItems => prevItems.map(item =>
                item.id === id ? { ...item, ...data } : item
            ));
        } else {
            // Create new
            const newItem = {
                ...data,
                // Simple ID generation for mock purposes. 
                // In a real app, the ID would come from the backend response.
                id: Math.max(0, ...items.map(i => Number(i.id))) + 1,
            } as T;
            setItems(prevItems => [...prevItems, newItem]);
        }
    }, [items]);

    const handleDelete = useCallback((id: number | string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        }
    }, []);

    return {
        items,
        handleSave,
        handleDelete,
        setItems
    };
}
