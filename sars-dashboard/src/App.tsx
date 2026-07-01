import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useGetMe, getGetMeQueryKey } from "@workspace/api-client-react";

import Layout from "./components/layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import History from "./pages/history";
import Statistics from "./pages/statistics";
import About from "./pages/about";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function AuthGuard({ component: Component }: { component: React.ComponentType }) {
  const [location, setLocation] = useLocation();
  const username = localStorage.getItem("username");
  
  const { data: user, isError, isLoading } = useGetMe({ 
    query: { 
      queryKey: getGetMeQueryKey(),
      retry: false
    } 
  });

  useEffect(() => {
    if (!username || isError) {
      localStorage.removeItem("username");
      setLocation("/login");
    }
  }, [username, isError, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-primary font-mono">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl tracking-widest">INITIALIZING SECURE CONNECTION...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return null;

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <AuthGuard component={Dashboard} />} />
      <Route path="/dashboard" component={() => <AuthGuard component={Dashboard} />} />
      <Route path="/history" component={() => <AuthGuard component={History} />} />
      <Route path="/statistics" component={() => <AuthGuard component={Statistics} />} />
      <Route path="/about" component={() => <AuthGuard component={About} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
