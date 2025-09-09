import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Map, FileText, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CitizenLayoutProps {
  children: ReactNode;
}

const CitizenLayout = ({ children }: CitizenLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/citizen/report", icon: Plus, label: "Report" },
    { path: "/citizen/map", icon: Map, label: "Map" },
    { path: "/citizen/reports", icon: FileText, label: "My Reports" },
    { path: "/citizen/notifications", icon: Bell, label: "Alerts" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary">CivicConnect</h1>
          <Link to="/citizen/profile">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="mobile-nav">
        <div className="flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "mobile-nav-item flex-1",
                isActive(item.path) && "active"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CitizenLayout;