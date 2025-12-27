import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  CreditCard,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "Users", icon: Users, path: "/users" },
  { title: "Billing", icon: CreditCard, path: "/billing" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
];

const bottomItems = [
  { title: "Settings", icon: Settings, path: "/settings" },
  { title: "Help", icon: HelpCircle, path: "/help" },
];

interface SidebarProps {
  onLogout?: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-glass backdrop-blur-xl border-r border-glass-border transition-all duration-300 ease-out flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-glass-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">StreamHub</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-muted-foreground hover:text-foreground", collapsed && "mx-auto mt-2")}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive(item.path)
                ? "bg-primary/20 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                isActive(item.path) ? "text-primary" : "group-hover:text-primary"
              )}
            />
            {!collapsed && (
              <span className="font-medium text-sm">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="px-2 py-4 border-t border-glass-border space-y-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive(item.path)
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 transition-colors duration-200",
                isActive(item.path) ? "text-primary" : "group-hover:text-primary"
              )}
            />
            {!collapsed && (
              <span className="font-medium text-sm">{item.title}</span>
            )}
          </NavLink>
        ))}
        
        {/* Logout button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 group"
        >
          <LogOut className="w-5 h-5 group-hover:text-destructive transition-colors duration-200" />
          {!collapsed && (
            <span className="font-medium text-sm">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}
