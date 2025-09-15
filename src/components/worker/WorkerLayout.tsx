import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  ClipboardList, 
  Camera, 
  CheckCircle,
  Clock,
  LogOut,
  Menu,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";

interface WorkerLayoutProps {
  children: ReactNode;
}

const WorkerLayout = ({ children }: WorkerLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    toast({
      title: "Worker Logout",
      description: "Urban Care Worker session ended",
    });
    navigate("/");
  };

  const navItems = [
    { path: "/worker/assignments", icon: ClipboardList, label: "My Assignments" },
    { path: "/worker/active", icon: Clock, label: "Active Tasks" },
    { path: "/worker/completed", icon: CheckCircle, label: "Completed" },
    { path: "/worker/capture", icon: Camera, label: "Task Photos" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <h1 className="text-lg font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    Urban Care
                  </h1>
                </div>
                <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
                  Field Worker
                </Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-secondary/10"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                  isActive(item.path)
                    ? "bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/5"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start gap-3",
              !sidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card/95 backdrop-blur-sm border-b border-border p-4 transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary">
              {navItems.find(item => isActive(item.path))?.label || "Assignments"}
            </h2>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Field Worker
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;