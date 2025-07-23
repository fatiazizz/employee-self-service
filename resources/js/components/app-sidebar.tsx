import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CalendarClock, Car, ClipboardList, LayoutGrid, ScrollText, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';
import { NavDepMain } from './nav-dep';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid, // نمای کلی سیستم
    },
    {
        title: 'Leave Request',
        href: '/leave-request',
        icon: CalendarClock, // درخواست مرخصی
    },
    {
        title: 'Recommendation Letter',
        href: '/recommendation-request',
        icon: ScrollText, // نامه معرفی
    },
    {
        title: 'Equipment Request',
        href: '/equipment-request',
        icon: ClipboardList, // نامه تجهیزات
    },
    {
        title: 'Vehicle Request',
        href: '/vehicle-request',
        icon: Car, // درخواست خودرو
    },
];

const managerNavItems: NavItem[] = [
    {
        title: 'Department Users',
        href: '/manager/users',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Departments',
        href: '/admin/departments',
        icon: Users,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.user?.is_admin === 1;
    const isManager = auth?.user?.is_manager === 1;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {isManager && <NavDepMain items={managerNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                {isAdmin && <NavFooter items={footerNavItems} className="mt-auto" />}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
