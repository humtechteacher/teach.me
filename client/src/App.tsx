import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import MisinformationGame from "@/pages/MisinformationGame";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={HomePage} />
      
      {/* Activities */}
      <Route path="/activities/misinformation-game" component={MisinformationGame} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Provide toast notification to all components via useToast hook
  const { toast } = useToast();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
