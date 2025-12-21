import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GoogleAnalytics from "@/components/google-analytics";
import SubscriptionMessage from "@/components/subscription-message";

// Eager load home page for fastest initial render
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Lazy load other pages for code splitting
const About = lazy(() => import("@/pages/about"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const Writing = lazy(() => import("@/pages/writing"));
const Contact = lazy(() => import("@/pages/contact"));
const ConfirmPage = lazy(() => import("@/pages/confirm"));
const UnsubscribePage = lazy(() => import("@/pages/unsubscribe"));
const MyThought = lazy(() => import("@/pages/my-thought"));
const Essay = lazy(() => import("@/pages/essay"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-[#5C5C5C]">Loading...</div>
    </div>
  );
}

function Router() {
  // Track page changes for analytics
  const [location] = useLocation();

  useEffect(() => {
    // Track page view in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-MEASUREMENT_ID', {
        page_path: location,
      });
    }
  }, [location]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/writing" component={Writing} />
        <Route path="/my-thought" component={MyThought} />
        <Route path="/essay/:id" component={Essay} />
        <Route path="/contact" component={Contact} />
        <Route path="/confirm" component={ConfirmPage} />
        <Route path="/unsubscribe" component={UnsubscribePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
      <SubscriptionMessage />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
