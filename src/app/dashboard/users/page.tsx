'use client';

import React, { useState } from 'react';
import { DataTable, Button, AutoForm } from '@/components/ui';
import { TableBuilder } from '@/utils/table-utils';
import { FormBuilder } from '@/utils/form-builder';
import { useFormModal } from '@/hooks/useFormModal';
import { useCrud } from '@/hooks/useCrud';
import { useSubmit } from '@/hooks/useSubmit';
import styles from './page.module.css';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    joined: string;
    avatar: string;
}

const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joined: '2024-01-15', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', joined: '2024-02-20', avatar: 'JS' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'pending', joined: '2024-03-10', avatar: 'BW' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', joined: '2024-01-25', avatar: 'AB' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'inactive', joined: '2024-02-05', avatar: 'CD' },
    { id: 6, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'active', joined: '2024-03-01', avatar: 'EM' },
    { id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'active', joined: '2024-01-30', avatar: 'FM' },
    { id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'pending', joined: '2024-02-15', avatar: 'GL' },
    { id: 9, name: 'Henry Taylor', email: 'henry@example.com', role: 'User', status: 'active', joined: '2024-03-05', avatar: 'HT' },
    { id: 10, name: 'Ivy Chen', email: 'ivy@example.com', role: 'Admin', status: 'active', joined: '2024-01-20', avatar: 'IC' },
    { id: 11, name: 'Jack Robinson', email: 'jack@example.com', role: 'User', status: 'inactive', joined: '2024-02-28', avatar: 'JR' },
    { id: 12, name: 'Kate Williams', email: 'kate@example.com', role: 'Editor', status: 'active', joined: '2024-03-12', avatar: 'KW' },
];

export default function UsersPage() {
    const crud = useCrud<User>(mockUsers);
    const formModal = useFormModal<User>({ role: 'User' } as Partial<User>);

    const columns = new TableBuilder<User>()
        .custom('name', 'User', (user) => (
            <div className={styles.userCell}>
                <div className={styles.avatar}>{user.avatar}</div>
                <div>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                </div>
            </div>
        ))
        .badge('role', 'Role', {
            'Admin': 'danger',
            'Editor': 'info',
            'User': 'default'
        })
        .badge('status', 'Status', {
            'active': 'success',
            'inactive': 'warning',
            'pending': 'default'
        })
        .date('joined', 'Joined')
        .build();

    const handleAddUser = () => {
        formModal.openAdd();
    };

    const handleEditUser = (user: User) => {
        formModal.openEdit(user);
    };

    const handleDeleteUser = (userId: number) => {
        crud.handleDelete(userId);
    };

    const userFormSchema = new FormBuilder()
        .text('name', 'Name', { required: true, placeholder: 'Enter user name' })
        .email('email', 'Email', { required: true, placeholder: 'Enter email address' })
        .select('role', 'Role', [
            { label: 'User', value: 'User' },
            { label: 'Editor', value: 'Editor' },
            { label: 'Admin', value: 'Admin' }
        ], { required: true })
        .build();

    const handleSubmit = useSubmit<User>(
        crud.handleSave,
        formModal.editingData,
        {
            onCreate: (data) => ({
                ...data,
                status: 'pending',
                joined: new Date().toISOString().split('T')[0],
                avatar: data.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
            }),
            onSuccess: formModal.close
        }
    );

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Users</h1>
                    <p className={styles.subtitle}>Manage your team members and their permissions</p>
                </div>
                <Button onClick={handleAddUser}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add User
                </Button>
            </div>

            <DataTable
                title="All Users"
                data={crud.items}
                columns={columns}
                searchPlaceholder="Search users..."
                pageSize={8}
                actions={(row) => (
                    <div className={styles.actions}>
                        <button
                            className={styles.actionButton}
                            onClick={() => handleEditUser(row)}
                            aria-label="Edit user"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                        <button
                            className={`${styles.actionButton} ${styles.danger}`}
                            onClick={() => handleDeleteUser(row.id)}
                            aria-label="Delete user"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                )}
            />

            <AutoForm
                schema={userFormSchema}
                defaultValues={formModal.editingData as Record<string, any>}
                onSubmit={handleSubmit}
                submitLabel={formModal.editingData?.id ? 'Save Changes' : 'Add User'}
                modal={{
                    isOpen: formModal.isOpen,
                    onClose: formModal.close,
                    title: formModal.editingData?.id ? 'Edit User' : 'Add New User'
                }}
            />
        </div>
    );
}
