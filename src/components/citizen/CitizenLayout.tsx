import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus, Map, FileText, Bell, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface CitizenLayoutProps {
  children: ReactNode;
}

const CitizenLayout = ({ children }: CitizenLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Thank you for using Urban Care",
    });
    navigate("/");
  };

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
      <header className="bg-card/95 backdrop-blur-sm border-b border-border p-4 sticky top-0 z-40 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Urban Care
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/citizen/profile">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
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