import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: ReactNode;
  userEmail?: string;
  onLogout?: () => void;
}

export function DashboardLayout({ children, userEmail, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={onLogout} />
      <div className="ml-64 transition-all duration-300">
        <TopBar userEmail={userEmail} onLogout={onLogout} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
