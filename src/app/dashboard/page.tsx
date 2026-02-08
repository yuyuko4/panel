'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, StatCard, Button } from '@/components/ui';
import styles from './page.module.css';

// Mock data for charts
const revenueData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 7000 },
];

const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Pro Plan', amount: '$99.00', status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Basic Plan', amount: '$29.00', status: 'pending' },
    { id: '#ORD-003', customer: 'Bob Wilson', product: 'Enterprise', amount: '$299.00', status: 'completed' },
    { id: '#ORD-004', customer: 'Alice Brown', product: 'Pro Plan', amount: '$99.00', status: 'cancelled' },
    { id: '#ORD-005', customer: 'Charlie Davis', product: 'Basic Plan', amount: '$29.00', status: 'completed' },
];

export default function DashboardPage() {
    const maxRevenue = Math.max(...revenueData.map(d => d.value));

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Dashboard</h1>
                    <p className={styles.subtitle}>Welcome back! Here&apos;s what&apos;s happening today.</p>
                </div>
                <div className={styles.actions}>
                    <Button variant="secondary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </Button>
                    <Button>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add New
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <StatCard
                    title="Total Revenue"
                    value="$45,231.89"
                    variant="primary"
                    trend={{ value: 20.1, label: 'from last month' }}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    }
                />
                <StatCard
                    title="Active Users"
                    value="2,350"
                    variant="success"
                    trend={{ value: 12.5, label: 'from last month' }}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    }
                />
                <StatCard
                    title="New Orders"
                    value="573"
                    variant="warning"
                    trend={{ value: -3.2, label: 'from last month' }}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    }
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.24%"
                    variant="danger"
                    trend={{ value: 8.7, label: 'from last month' }}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                    }
                />
            </div>

            {/* Charts Row */}
            <div className={styles.chartsRow}>
                <Card className={styles.chartCard}>
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.chart}>
                            <div className={styles.chartBars}>
                                {revenueData.map((item) => (
                                    <div key={item.month} className={styles.barContainer}>
                                        <div
                                            className={styles.bar}
                                            style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                                        >
                                            <span className={styles.barValue}>${(item.value / 1000).toFixed(0)}k</span>
                                        </div>
                                        <span className={styles.barLabel}>{item.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={styles.activityCard}>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.activityList}>
                            <div className={styles.activityItem}>
                                <div className={`${styles.activityIcon} ${styles.iconBlue}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                </div>
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>New user registered</p>
                                    <span className={styles.activityTime}>2 minutes ago</span>
                                </div>
                            </div>
                            <div className={styles.activityItem}>
                                <div className={`${styles.activityIcon} ${styles.iconGreen}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>Order #ORD-001 completed</p>
                                    <span className={styles.activityTime}>15 minutes ago</span>
                                </div>
                            </div>
                            <div className={styles.activityItem}>
                                <div className={`${styles.activityIcon} ${styles.iconPurple}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="1" x2="12" y2="23" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </div>
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>Payment received: $299.00</p>
                                    <span className={styles.activityTime}>1 hour ago</span>
                                </div>
                            </div>
                            <div className={styles.activityItem}>
                                <div className={`${styles.activityIcon} ${styles.iconOrange}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </div>
                                <div className={styles.activityContent}>
                                    <p className={styles.activityText}>Low stock alert: Product XYZ</p>
                                    <span className={styles.activityTime}>3 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders Table */}
            <Card>
                <CardHeader>
                    <div className={styles.tableHeader}>
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={styles.orderId}>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.product}</td>
                                        <td className={styles.amount}>{order.amount}</td>
                                        <td>
                                            <span className={`${styles.status} ${styles[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
