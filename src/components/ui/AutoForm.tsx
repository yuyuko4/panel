import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import { Modal } from './Modal';
import { FieldDefinition } from '@/utils/form-builder';

interface AutoFormProps {
    schema: FieldDefinition[];
    defaultValues?: Record<string, any>;
    onSubmit: (data: any) => void;
    submitLabel?: string;
    loading?: boolean;
    className?: string;
    modal?: {
        isOpen: boolean;
        onClose: () => void;
        title: string;
        size?: 'sm' | 'md' | 'lg' | 'xl';
    };
}

export function AutoForm({
    schema,
    defaultValues,
    onSubmit,
    submitLabel = 'Submit',
    loading = false,
    className = '',
    modal
}: AutoFormProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (defaultValues) {
            setFormData(defaultValues);
        }
    }, [defaultValues]);

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        const newErrors: Record<string, string> = {};
        let isValid = true;

        schema.forEach(field => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
                isValid = false;
            }
        });

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
    };

    const formContent = (
        <form onSubmit={handleSubmit} className={className}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {schema.map((field) => (
                    <div
                        key={field.name}
                        style={{
                            flex: field.width === 'half' ? '1 1 calc(50% - 0.5rem)' : '1 1 100%',
                            minWidth: '250px'
                        }}
                    >
                        {field.type === 'select' ? (
                            <Select
                                label={field.label}
                                options={field.options || []}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                error={errors[field.name]}
                                fullWidth
                                disabled={loading}
                            />
                        ) : (
                            <Input
                                label={field.label}
                                type={field.type === 'date' ? 'date' : (field.type === 'number' ? 'number' : 'text')}
                                placeholder={field.placeholder}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                error={errors[field.name]}
                                fullWidth
                                disabled={loading}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                {modal && (
                    <Button type="button" variant="ghost" onClick={modal.onClose} disabled={loading}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" loading={loading}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );

    if (modal) {
        return (
            <Modal
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                title={modal.title}
                size={modal.size}
                footer={null}
            >
                {formContent}
            </Modal>
        );
    }

    return formContent;
}
