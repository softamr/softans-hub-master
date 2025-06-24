
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  Building2,
  Newspaper,
  MessageSquare,
  Settings,
  LogOut,
  PanelBottom,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/footer', label: 'Footer', icon: PanelBottom },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/industries', label: 'Industries', icon: Building2 },
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
    { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/20 bg-gradient-to-b from-white to-gray-50/50">
        <SidebarHeader className="p-6">
          <div className="flex items-center space-x-2">
            <Logo />
            <span className="font-headline font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarMenu className="space-y-2">
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label }}
                  className={cn(
                    "rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md group",
                    pathname.startsWith(item.href) && "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-modern"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link href={item.href} className="flex items-center space-x-3">
                    <item.icon className={cn(
                      "transition-transform group-hover:scale-110",
                      pathname.startsWith(item.href) ? "text-white" : "text-muted-foreground"
                    )} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-3 border-t border-border/20">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/admin/settings'}
                tooltip={{ children: 'Settings' }}
                className="rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
              >
                <Link href="#" className="flex items-center space-x-3">
                  <Settings className="text-muted-foreground" />
                  <span className="font-medium">Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600"
                  tooltip={{ children: 'Logout' }}
                >
                  <Link href="/" className="flex items-center space-x-3">
                    <LogOut className="text-muted-foreground" />
                    <span className="font-medium">Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-gradient-to-br from-gray-50/50 to-white">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/20 bg-white/80 backdrop-blur-lg px-4 sm:px-6 shadow-sm">
          <SidebarTrigger className="sm:hidden hover:bg-blue-50 rounded-lg transition-colors" />
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">Welcome back!</p>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass border border-border/20">
                <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-50 transition-colors">Settings</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50 transition-colors">Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-red-50 text-red-600 transition-colors">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="p-6 sm:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
