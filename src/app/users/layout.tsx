import { AdminLayout } from '@/components/layout';

export default function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayout>{children}</AdminLayout>;
}
