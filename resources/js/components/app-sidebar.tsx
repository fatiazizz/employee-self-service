import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutGrid,
  CalendarClock,
  ScrollText,
  ClipboardList,
  Car,
  Send,
  Users
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from './nav-footer';

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
  // {
  //   title: 'Send Request',
  //   href: '/send-request',
  //   icon: Send, // ارسال درخواست
  // },
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
            </SidebarContent>

            <SidebarFooter>
        {isAdmin && <NavFooter items={footerNavItems} className="mt-auto" />}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
