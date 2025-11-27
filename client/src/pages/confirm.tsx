import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

/**
 * Confirmation Page
 * 
 * This page handles email confirmation for newsletter subscribers.
 * It receives a token via query parameter and confirms the subscription
 * by calling the API endpoint.
 */
export default function ConfirmPage() {
  const [location, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { toast } = useToast();
  const debugLogs = import.meta.env.VITE_DEBUG_LOGS === 'true';
  const isDevelopment = process.env.NODE_ENV !== 'production' || debugLogs;
  
  // SEO data for confirmation page
  const confirmSchemaData = {
    url: 'https://tkhongsap.io/confirm',
    name: 'Confirm Newsletter Subscription | Totrakool Khongsap',
    description: 'Confirm your subscription to receive updates on AI trends, productivity tips, and coding insights from Totrakool Khongsap.'
  };
  
  // Extract token from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    setToken(tokenParam);
    
    // Add debug information only in development
    if (isDevelopment) {
      setDebugInfo(`
        Page loaded at: ${new Date().toISOString()}
        URL: ${window.location.href}
        Token: ${tokenParam}
        Hostname: ${window.location.hostname}
        Origin: ${window.location.origin}
        API URL: ${window.location.hostname === 'localhost' 
          ? `/api/newsletter/confirm?token=${tokenParam}`
          : `${window.location.origin}/api/newsletter/confirm?token=${tokenParam}`}
      `);
      
      // Log for debugging
      console.log('Confirmation page loaded', {
        url: window.location.href,
        token: tokenParam,
        hostname: window.location.hostname,
        origin: window.location.origin,
        apiUrl: window.location.hostname === 'localhost' 
          ? `/api/newsletter/confirm?token=${tokenParam}`
          : `${window.location.origin}/api/newsletter/confirm?token=${tokenParam}`
      });
    }
  }, [isDevelopment]);
  
  // Function to manually confirm subscription
  const manuallyConfirm = async () => {
    if (!token) return;
    
    try {
      // Construct the direct API URL with full domain
      const apiUrl = `${window.location.origin}/api/newsletter/confirm?token=${token}`;
      
      if (isDevelopment) {
        console.log('Manually confirming with URL:', apiUrl);
        setDebugInfo(prev => prev + `\nAttempting manual confirmation at: ${new Date().toISOString()}\nAPI URL: ${apiUrl}`);
      }
      
      // Make the fetch request
      const response = await fetch(apiUrl, {
        // Adding cache-control headers to prevent caching issues
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
      
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        if (isDevelopment) {
          console.error('Failed to parse JSON response:', jsonError);
          setDebugInfo(prev => prev + `\nError parsing JSON response: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`);
          
          // Fallback to text response if JSON parsing fails
          const textResponse = await response.text();
          setDebugInfo(prev => prev + `\nText response: ${textResponse}`);
        }
        
        result = { 
          success: response.ok, 
          message: response.ok ? "Subscription confirmed" : "Failed to confirm subscription" 
        };
      }
      
      if (isDevelopment) {
        console.log('Manual confirmation result:', result);
        setDebugInfo(prev => prev + `\nAPI Response: ${JSON.stringify(result)}`);
      }
      
      // Show toast with result
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your subscription has been confirmed successfully!",
        });
        // Force reload the page after a short delay
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Confirmation Failed",
          description: result.message || "Failed to confirm your subscription",
        });
      }
    } catch (error) {
      if (isDevelopment) {
        console.error('Manual confirmation error:', error);
        setDebugInfo(prev => prev + `\nError: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while trying to confirm your subscription. Please try again.",
      });
    }
  };
  
  // If no token is provided, show an error
  if (token === null) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <SEO
            title="Invalid Confirmation Link | Newsletter Subscription"
            description="Unable to confirm your newsletter subscription due to an invalid or missing token. Please check your email for the correct confirmation link."
            canonicalUrl="/confirm"
            keywords="newsletter confirmation, subscription error, invalid token"
            pageUrl="/confirm"
          />
          <SchemaMarkup type="website" data={confirmSchemaData} />
          <Card className="editorial-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Invalid Confirmation</CardTitle>
              <CardDescription className="text-[#5C5C5C]">No confirmation token was provided.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  The confirmation link you used is invalid. Please check your email for the correct link or request a new confirmation email.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setLocation('/')} className="bg-[#C45B3E] hover:bg-[#A84832] text-white">Return to Home</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  // Call the API to confirm subscription
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/api/newsletter/confirm', token],
    queryFn: async () => {
      // Ensure API URL works for both local development and production
      const apiUrl = window.location.hostname === 'localhost' 
        ? `/api/newsletter/confirm?token=${token}`
        : `${window.location.origin}/api/newsletter/confirm?token=${token}`;
      
      if (isDevelopment) {
        console.log('Automatic confirmation attempt with URL:', apiUrl);
        setDebugInfo(prev => prev + `\nAutomatic confirmation attempt at: ${new Date().toISOString()}\nAPI URL: ${apiUrl}`);
      }
        
      try {
        const response = await fetch(apiUrl);
        const responseJson = await response.json();
        
        if (isDevelopment) {
          console.log('API Response:', responseJson);
          setDebugInfo(prev => prev + `\nAPI Response: ${JSON.stringify(responseJson)}`);
        }
        
        if (!response.ok) {
          throw new Error(responseJson.message || 'Failed to confirm subscription');
        }
        
        return responseJson;
      } catch (error) {
        if (isDevelopment) {
          console.error('API request failed:', error);
          setDebugInfo(prev => prev + `\nAPI Request Error: ${error instanceof Error ? error.message : String(error)}`);
        }
        throw error;
      }
    },
    retry: 1, // Try once more in case of network issues
    retryDelay: 1000, // Wait 1 second before retry
    // Only start the query once we have a token
    enabled: token !== null
  });
  
  // Show loading state with debug button
  if (isLoading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <SEO
            title="Confirming Your Subscription | Newsletter"
            description="Please wait while we confirm your newsletter subscription to receive updates on AI trends and insights."
            canonicalUrl="/confirm"
            keywords="newsletter confirmation, subscription confirmation, confirm email"
            pageUrl="/confirm"
          />
          <SchemaMarkup type="website" data={confirmSchemaData} />
          <Card className="editorial-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Confirming Subscription</CardTitle>
              <CardDescription className="text-[#5C5C5C]">Please wait while we confirm your subscription...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-6">
                <Loader2 className="h-12 w-12 animate-spin text-[#C45B3E]" />
              </div>

              <div className="mt-4">
                <Alert className="border-[#E8E4DF] bg-[#F5F0EB]">
                  <AlertTitle className="text-[#1A1A1A]">Is the page stuck loading?</AlertTitle>
                  <AlertDescription className="text-[#5C5C5C]">
                    Try the manual confirmation button below:
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center mt-4">
                  <Button onClick={manuallyConfirm} className="flex items-center gap-2 bg-[#C45B3E] hover:bg-[#A84832] text-white">
                    <ExternalLink className="h-4 w-4" />
                    Manually Confirm Subscription
                  </Button>
                </div>
              </div>

              {isDevelopment && (
                <div className="mt-6 p-4 bg-[#F5F0EB] rounded-md text-xs overflow-auto max-h-48">
                  <p className="font-semibold mb-2 text-[#1A1A1A]">Debug Information:</p>
                  <pre className="whitespace-pre-wrap text-[#5C5C5C]">{debugInfo}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Show error state with debug button
  if (isError) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'An error occurred while confirming your subscription.';

    return (
      <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <SEO
            title="Confirmation Failed | Newsletter Subscription"
            description="We encountered an error while trying to confirm your newsletter subscription. Please try again or contact support."
            canonicalUrl="/confirm"
            keywords="newsletter error, subscription failed, confirmation problem"
            pageUrl="/confirm"
          />
          <SchemaMarkup type="website" data={confirmSchemaData} />
          <Card className="editorial-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Confirmation Failed</CardTitle>
              <CardDescription className="text-[#5C5C5C]">We couldn't confirm your subscription.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>

              <div className="mt-4">
                <Alert className="border-[#E8E4DF] bg-[#F5F0EB]">
                  <AlertTitle className="text-[#1A1A1A]">Try Manual Confirmation</AlertTitle>
                  <AlertDescription className="text-[#5C5C5C]">
                    The automatic confirmation failed. Try the manual confirmation button:
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center mt-4">
                  <Button onClick={manuallyConfirm} className="flex items-center gap-2 bg-[#C45B3E] hover:bg-[#A84832] text-white">
                    <ExternalLink className="h-4 w-4" />
                    Manually Confirm Subscription
                  </Button>
                </div>
              </div>

              {isDevelopment && (
                <div className="mt-6 p-4 bg-[#F5F0EB] rounded-md text-xs overflow-auto max-h-48">
                  <p className="font-semibold mb-2 text-[#1A1A1A]">Debug Information:</p>
                  <pre className="whitespace-pre-wrap text-[#5C5C5C]">{debugInfo}</pre>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => setLocation('/')} className="bg-[#C45B3E] hover:bg-[#A84832] text-white">Return to Home</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  // Show success state
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
      <div className="container max-w-md mx-auto px-4">
        <SEO
          title="Subscription Confirmed | Newsletter Success"
          description="Your newsletter subscription has been successfully confirmed. You'll now receive updates on AI trends, productivity tips, and coding insights."
          canonicalUrl="/confirm"
          keywords="newsletter confirmed, subscription success, email updates"
          pageUrl="/confirm"
        />
        <SchemaMarkup type="website" data={confirmSchemaData} />
        <Card className="editorial-card">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Subscription Confirmed!</CardTitle>
            <CardDescription className="text-[#5C5C5C]">You're now subscribed to my newsletter.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6">
              <CheckCircle2 className="h-16 w-16 text-[#C45B3E] mb-4" />
              <p className="text-center mb-4 text-[#1A1A1A]">
                Thank you for confirming your subscription! You'll now receive updates and insights straight to your inbox.
              </p>
            </div>

            {isDevelopment && (
              <div className="mt-6 p-4 bg-[#F5F0EB] rounded-md text-xs overflow-auto max-h-48">
                <p className="font-semibold mb-2 text-[#1A1A1A]">Debug Information:</p>
                <pre className="whitespace-pre-wrap text-[#5C5C5C]">{debugInfo}</pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => setLocation('/')} className="bg-[#C45B3E] hover:bg-[#A84832] text-white">Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}