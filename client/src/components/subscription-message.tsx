import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import { 
  CheckCircle2, 
  XCircle 
} from "lucide-react";

export default function SubscriptionMessage() {
  const [location] = useLocation();
  const [message, setMessage] = useState<{
    type: "confirmed" | "unsubscribed" | null;
    shown: boolean;
  }>({
    type: null,
    shown: false
  });
  
  useEffect(() => {
    // Parse query params
    const params = new URLSearchParams(location.split("?")[1]);
    
    if (params.has("confirmed")) {
      setMessage({
        type: "confirmed",
        shown: true
      });
      
      // Remove param from URL without page reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    } else if (params.has("unsubscribed")) {
      setMessage({
        type: "unsubscribed",
        shown: true
      });
      
      // Remove param from URL without page reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);
  
  // Auto-hide after 7 seconds
  useEffect(() => {
    if (message.shown) {
      const timer = setTimeout(() => {
        setMessage(prev => ({
          ...prev,
          shown: false
        }));
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, [message.shown]);
  
  if (!message.shown) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      {message.type === "confirmed" && (
        <Alert className="bg-green-50 border-green-500 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Subscription Confirmed</AlertTitle>
          <AlertDescription>
            Thank you for confirming your subscription to the newsletter!
          </AlertDescription>
        </Alert>
      )}
      
      {message.type === "unsubscribed" && (
        <Alert className="bg-amber-50 border-amber-500 text-amber-800">
          <XCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Unsubscribed</AlertTitle>
          <AlertDescription>
            You have been successfully unsubscribed from the newsletter.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}