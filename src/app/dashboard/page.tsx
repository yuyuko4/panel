'use client';

import { Card, CardHeader, CardTitle, CardContent, StatCard, Button } from '@/components/ui';

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

const statusClasses: Record<string, string> = {
    completed: 'bg-success-bg text-success',
    pending: 'bg-warning-bg text-warning',
    cancelled: 'bg-danger-bg text-danger',
};

export default function DashboardPage() {
    const maxRevenue = Math.max(...revenueData.map(d => d.value));

    return (
        <div className="flex flex-col gap-xl">
            <div className="flex flex-wrap items-start justify-between gap-lg">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
                    <p className="mt-xs text-sm text-text-muted">
                        Welcome back! Here&apos;s what&apos;s happening today.
                    </p>
                </div>
                <div className="flex gap-sm max-sm:w-full">
                    <Button variant="secondary" className="max-sm:flex-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export
                    </Button>
                    <Button className="max-sm:flex-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add New
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-lg [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
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
            <div className="grid gap-lg lg:[grid-template-columns:2fr_1fr]">
                <Card className="min-h-[350px]">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-[280px] items-end pt-lg">
                            <div className="flex h-full w-full items-end justify-around gap-md">
                                {revenueData.map((item) => (
                                    <div key={item.month} className="flex h-full flex-1 flex-col items-center">
                                        <div
                                            className="group relative w-full max-w-[60px] cursor-pointer rounded-t-md bg-accent-gradient transition-all duration-250 hover:brightness-110 hover:scale-y-[1.02]"
                                            style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                                        >
                                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-text-secondary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                                ${(item.value / 1000).toFixed(0)}k
                                            </span>
                                        </div>
                                        <span className="mt-sm text-xs text-text-muted">{item.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-h-[350px]">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-md">
                            <div className="flex items-start gap-md py-sm">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.1)] text-[#3b82f6]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-text-primary">New user registered</p>
                                    <span className="text-xs text-text-muted">2 minutes ago</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-md py-sm">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(16,185,129,0.1)] text-[#10b981]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-text-primary">Order #ORD-001 completed</p>
                                    <span className="text-xs text-text-muted">15 minutes ago</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-md py-sm">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.1)] text-[#8b5cf6]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="1" x2="12" y2="23" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-text-primary">Payment received: $299.00</p>
                                    <span className="text-xs text-text-muted">1 hour ago</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-md py-sm">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(245,158,11,0.1)] text-[#f59e0b]">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-text-primary">Low stock alert: Product XYZ</p>
                                    <span className="text-xs text-text-muted">3 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b border-border px-md py-sm text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">Order ID</th>
                                    <th className="border-b border-border px-md py-sm text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">Customer</th>
                                    <th className="border-b border-border px-md py-sm text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">Product</th>
                                    <th className="border-b border-border px-md py-sm text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">Amount</th>
                                    <th className="border-b border-border px-md py-sm text-left text-xs font-semibold uppercase tracking-[0.05em] text-text-muted">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="transition-colors duration-150 hover:bg-bg-hover">
                                        <td className="px-md py-md text-sm font-semibold text-accent-primary">{order.id}</td>
                                        <td className="px-md py-md text-sm text-text-primary">{order.customer}</td>
                                        <td className="px-md py-md text-sm text-text-primary">{order.product}</td>
                                        <td className="px-md py-md text-sm font-semibold text-text-primary">{order.amount}</td>
                                        <td className="px-md py-md text-sm text-text-primary">
                                            <span className={`inline-flex rounded-full px-[10px] py-1 text-xs font-medium capitalize ${statusClasses[order.status]}`}>
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
