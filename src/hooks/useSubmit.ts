
import { useCallback } from 'react';

interface UseSubmitOptions<T> {
    onCreate?: (data: any) => Partial<T>;
    onUpdate?: (data: any) => Partial<T>;
    onSuccess?: () => void;
}

export function useSubmit<T extends { id: number | string }>(
    handleSave: (data: Partial<T>, id?: number | string) => void,
    editingData: T | null,
    options: UseSubmitOptions<T> = {}
) {
    const { onCreate, onUpdate, onSuccess } = options;

    return useCallback((data: any) => {
        const isNew = !editingData?.id;

        let processedData = data;

        if (isNew && onCreate) {
            processedData = onCreate(data);
        } else if (!isNew && onUpdate) {
            processedData = onUpdate(data);
        }

        handleSave(processedData, editingData?.id);

        if (onSuccess) {
            onSuccess();
        }
    }, [handleSave, editingData, onCreate, onUpdate, onSuccess]);
}
