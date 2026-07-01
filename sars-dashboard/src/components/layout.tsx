import { Link, useLocation } from "wouter";
import { useLogout, useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";
import { LogOut, Activity, Clock, BarChart3, Info, Crosshair } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: user } = useGetMe({ query: { queryKey: getGetMeQueryKey() } });
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("username");
        queryClient.clear();
        setLocation("/login");
      }
    });
  };

  const navLinks = [
    { href: "/dashboard", label: "DASHBOARD", icon: Activity },
    { href: "/history", label: "LOGS", icon: Clock },
    { href: "/statistics", label: "ANALYTICS", icon: BarChart3 },
    { href: "/about", label: "SYSTEM INFO", icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md shadow-md">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20"></div>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded border border-primary/30">
              <Crosshair className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.2em] text-primary leading-none">SARS SYSTEM</span>
              <span className="text-[0.65rem] tracking-widest text-muted-foreground leading-tight mt-0.5">Respiratory Monitoring & Control</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/30" 
                      : "text-muted-foreground hover:bg-card-foreground/5 hover:text-foreground border border-transparent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground leading-none">Active Operator</span>
              <span className="font-mono text-sm text-foreground mt-0.5">{user?.username || localStorage.getItem("username")}</span>
            </div>
            <div className="w-[1px] h-8 bg-border hidden sm:block"></div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-mono text-xs uppercase tracking-wider h-8 px-3"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px]"></div>
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground font-mono tracking-widest relative z-10 flex flex-col sm:flex-row justify-between items-center opacity-70">
          <span>© 2026 SARS RESPIRATORY PROJECT. ALL RIGHTS RESERVED.</span>
          <span className="mt-2 sm:mt-0">SECURE CONNECTION ESTABLISHED</span>
        </div>
      </footer>
    </div>
  );
}
