import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Portfolio from "@/pages/portfolio";
import Writing from "@/pages/writing";
import Contact from "@/pages/contact";
import GoogleAnalytics from "@/components/google-analytics";

function Router() {
  // Track page changes for analytics
  const [location] = useLocation();
  
  useEffect(() => {
    // Track page view in Google Analytics
    if (window.gtag) {
      window.gtag('config', 'G-MEASUREMENT_ID', {
        page_path: location,
      });
    }
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/writing" component={Writing} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      {/* Add Google Analytics */}
      <GoogleAnalytics />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
