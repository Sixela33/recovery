"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { 
  Home, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  Menu,
  X,
  UserPlus,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/guardians', label: 'Guardians', icon: Users },
  { path: '/add-guardian', label: 'Add Guardian', icon: UserPlus },
  { path: '/recovery', label: 'Recovery', icon: Shield },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className="min-h-screen bg-background flex max-w-full">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -256,
          width: sidebarCollapsed ? 64 : 256
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="fixed inset-y-0 left-0 z-50 bg-sidebar shadow-lg lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-between h-16 px-3 lg:px-6 border-b border-sidebar-border">
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-sidebar-foreground">Guardians</span>
            </Link>
          )}
          <div className="flex items-center space-x-2">
            {/* Desktop collapse/expand button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeSidebar}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border-r-2 border-sidebar-primary' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-sidebar-foreground text-sidebar text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-background shadow-sm border-b border-border">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={openSidebar}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Guardians</span>
            </Link>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Desktop header - show when sidebar is collapsed */}
        {sidebarCollapsed && (
          <div className="hidden lg:block bg-background shadow-sm border-b border-border">
            <div className="flex items-center justify-between h-16 px-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="flex items-center space-x-2"
              >
                <ChevronRight className="w-5 h-5" />
                <span className="text-sm font-medium">Expand Menu</span>
              </Button>
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">Guardians</span>
              </Link>
              <div className="w-32" /> {/* Spacer for centering */}
            </div>
          </div>
        )}

        {/* Content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
