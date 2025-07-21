import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AIChatbot } from '@/components/AIChatbot';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import * as React from 'react';
import { MessageSquare } from 'lucide-react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const [isChatbotOpen, setIsChatbotOpen] = React.useState(false);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>

            {isChatbotOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <AIChatbot />
                </div>
            )}

            <Button
                className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg"
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                size="icon"
            >
                <MessageSquare className="h-6 w-6" />
            </Button>
        </AppShell>
    );
}
