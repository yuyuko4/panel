'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, DataTable, Button, Modal, Input, type Column } from '@/components/ui';
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
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });

    const columns: Column<User>[] = [
        {
            key: 'name',
            header: 'User',
            render: (_, row) => (
                <div className={styles.userCell}>
                    <div className={styles.avatar}>{row.avatar}</div>
                    <div>
                        <div className={styles.userName}>{row.name}</div>
                        <div className={styles.userEmail}>{row.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            header: 'Role',
            render: (value) => (
                <span className={`${styles.role} ${styles[`role${value}`]}`}>
                    {value as string}
                </span>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (value) => (
                <span className={`${styles.status} ${styles[value as string]}`}>
                    {value as string}
                </span>
            ),
        },
        {
            key: 'joined',
            header: 'Joined',
            render: (value) => new Date(value as string).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        },
    ];

    const handleAddUser = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'User' });
        setIsModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setIsModalOpen(true);
    };

    const handleDeleteUser = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const handleSubmit = () => {
        if (editingUser) {
            setUsers(users.map(u =>
                u.id === editingUser.id
                    ? { ...u, name: formData.name, email: formData.email, role: formData.role }
                    : u
            ));
        } else {
            const newUser: User = {
                id: Math.max(...users.map(u => u.id)) + 1,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: 'pending',
                joined: new Date().toISOString().split('T')[0],
                avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            };
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };

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

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={users}
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
                </CardContent>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? 'Edit User' : 'Add New User'}
                footer={
                    <div className={styles.modalFooter}>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            {editingUser ? 'Save Changes' : 'Add User'}
                        </Button>
                    </div>
                }
            >
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Input
                        label="Name"
                        placeholder="Enter user name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        fullWidth
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        fullWidth
                    />
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel}>Role</label>
                        <select
                            className={styles.select}
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="User">User</option>
                            <option value="Editor">Editor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
