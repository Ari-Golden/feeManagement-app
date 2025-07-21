import { SectionCards } from '@/components/section-cards';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
const cardData = [
    {
        description: 'Total Revenue',
        title: 'Total Revenue',
        value: '$1,250.00',
        trend: 'up' as const,
        trendText: '+12.5%',
        footerMainText: 'Trending up this month',
        footerSubText: 'Visitors for the last 6 months',
    },
    {
        description: 'Student Enrollments',
        title: 'Student Enrollments',
        value: '1,234',
        trend: 'down' as const,
        trendText: '-20%',
        footerMainText: 'Down 20% this period',
        footerSubText: 'Acquisition needs attention',
    },
    {
        description: 'Active Accounts',
        title: 'Active Accounts',
        value: '45,678',
        trend: 'up' as const,
        trendText: '+12.5%',
        footerMainText: 'Strong user retention',
        footerSubText: 'Engagement exceed targets',
    },
    {
        description: 'Growth Rate',
        title: 'Growth Rate',
        value: '4.5%',
        trend: 'up' as const,
        trendText: '+4.5%',
        footerMainText: 'Steady performance increase',
        footerSubText: 'Meets growth projections',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards cards={cardData} />
                        <div className="px-4 lg:px-6">{/* <StudentPage students={[]} /> */}</div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
