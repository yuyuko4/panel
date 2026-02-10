import { AdminLayout } from '@/components/layout';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayout>{children}</AdminLayout>;
}
