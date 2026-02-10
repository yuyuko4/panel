
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date';

export interface FieldOption {
    label: string;
    value: string | number;
}

export interface FieldDefinition {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: FieldOption[];
    defaultValue?: any;
    width?: 'full' | 'half';
}

export class FormBuilder {
    private fields: FieldDefinition[] = [];

    text(name: string, label: string, options: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'text', width: 'full', ...options });
        return this;
    }

    email(name: string, label: string, options: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'email', width: 'full', ...options });
        return this;
    }

    password(name: string, label: string, options: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'password', width: 'full', ...options });
        return this;
    }

    number(name: string, label: string, options: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'number', width: 'half', ...options });
        return this;
    }

    select(name: string, label: string, options: FieldOption[], config: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'select', options, width: 'full', ...config });
        return this;
    }

    textarea(name: string, label: string, options: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'textarea', width: 'full', ...options });
        return this;
    }

    date(name: string, label: string, options: Partial<FieldDefinition> = {}): this {
        this.fields.push({ name, label, type: 'date', width: 'half', ...options });
        return this;
    }

    build(): FieldDefinition[] {
        return this.fields;
    }
}

