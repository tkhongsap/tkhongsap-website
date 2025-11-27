import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

/**
 * Unsubscribe Page
 * 
 * This page handles unsubscribing from the newsletter.
 * It receives a token via query parameter and unsubscribes the user
 * by calling the API endpoint.
 */
export default function UnsubscribePage() {
  const [location, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { toast } = useToast();
  const debugLogs = import.meta.env.VITE_DEBUG_LOGS === 'true';
  const isDevelopment = process.env.NODE_ENV !== 'production' || debugLogs;
  
  // SEO data for unsubscribe page
  const unsubscribeSchemaData = {
    url: 'https://tkhongsap.io/unsubscribe',
    name: 'Unsubscribe from Newsletter | Totrakool Khongsap',
    description: 'Manage your newsletter preferences and unsubscribe from updates on AI trends, productivity tips, and coding insights.'
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
      `);
      
      // Log for debugging
      console.log('Unsubscribe page loaded', {
        url: window.location.href,
        token: tokenParam
      });
    }
  }, [isDevelopment]);
  
  // Function to manually unsubscribe
  const manuallyUnsubscribe = async () => {
    if (!token) return;
    
    try {
      // Construct the direct API URL with full domain
      const apiUrl = `${window.location.origin}/api/newsletter/unsubscribe?token=${token}`;
      
      if (isDevelopment) {
        console.log('Manually unsubscribing with URL:', apiUrl);
        setDebugInfo(prev => prev + `\nAttempting manual unsubscribe at: ${new Date().toISOString()}\nAPI URL: ${apiUrl}`);
      }
      
      const response = await fetch(apiUrl);
      const result = await response.json();
      
      if (isDevelopment) {
        console.log('Manual unsubscribe result:', result);
        setDebugInfo(prev => prev + `\nAPI Response: ${JSON.stringify(result)}`);
      }
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "You have been unsubscribed from the newsletter.",
        });
        // Force reload the page after a short delay
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Unsubscribe Failed",
          description: result.message || "Failed to unsubscribe",
        });
      }
    } catch (error) {
      if (isDevelopment) {
        console.error('Manual unsubscribe error:', error);
        setDebugInfo(prev => prev + `\nError: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while trying to unsubscribe. Please try again.",
      });
    }
  };
  
  // If no token is provided, show an error
  if (token === null) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <SEO
            title="Invalid Unsubscribe Link | Newsletter Management"
            description="Unable to process your unsubscribe request due to an invalid or missing token. Please check your email for the correct unsubscribe link."
            canonicalUrl="/unsubscribe"
            keywords="newsletter unsubscribe, manage subscription, invalid unsubscribe link"
            pageUrl="/unsubscribe"
          />
          <SchemaMarkup type="website" data={unsubscribeSchemaData} />
          <Card className="editorial-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Invalid Unsubscribe Link</CardTitle>
              <CardDescription className="text-[#5C5C5C]">No unsubscribe token was provided.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  The unsubscribe link you used is invalid. Please try clicking the link from your email again.
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
  
  // Call the API to unsubscribe
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/api/newsletter/unsubscribe', token],
    queryFn: async () => {
      // Ensure API URL works for both local development and production
      const apiUrl = window.location.hostname === 'localhost' 
        ? `/api/newsletter/unsubscribe?token=${token}`
        : `${window.location.origin}/api/newsletter/unsubscribe?token=${token}`;
      
      if (isDevelopment) {
        console.log('Automatic unsubscribe attempt with URL:', apiUrl);
        setDebugInfo(prev => prev + `\nAutomatic unsubscribe attempt at: ${new Date().toISOString()}\nAPI URL: ${apiUrl}`);
      }
      
      const response = await fetch(apiUrl);
      const responseJson = await response.json();
      
      if (isDevelopment) {
        console.log('API Response:', responseJson);
        setDebugInfo(prev => prev + `\nAPI Response: ${JSON.stringify(responseJson)}`);
      }
      
      if (!response.ok) {
        throw new Error(responseJson.message || 'Failed to unsubscribe');
      }
      
      return responseJson;
    },
    retry: 1, // Try once more in case of network issues
    retryDelay: 1000, // Wait 1 second before retry
    // Only start the query once we have a token
    enabled: token !== null
  });
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <SEO
            title="Processing Unsubscribe Request | Newsletter Management"
            description="Please wait while we process your request to unsubscribe from the newsletter."
            canonicalUrl="/unsubscribe"
            keywords="newsletter unsubscribe, cancel subscription, email preferences"
            pageUrl="/unsubscribe"
          />
          <SchemaMarkup type="website" data={unsubscribeSchemaData} />
          <Card className="editorial-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Processing Unsubscribe Request</CardTitle>
              <CardDescription className="text-[#5C5C5C]">Please wait while we process your request...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-6">
                <Loader2 className="h-12 w-12 animate-spin text-[#C45B3E]" />
              </div>

              <div className="mt-4">
                <Alert className="border-[#E8E4DF] bg-[#F5F0EB]">
                  <AlertTitle className="text-[#1A1A1A]">Is the page stuck loading?</AlertTitle>
                  <AlertDescription className="text-[#5C5C5C]">
                    Try the manual unsubscribe button below:
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center mt-4">
                  <Button onClick={manuallyUnsubscribe} className="bg-[#C45B3E] hover:bg-[#A84832] text-white">
                    Manually Unsubscribe
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
  
  // Show error state
  if (isError) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'An error occurred while processing your unsubscribe request.';

    return (
      <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <SEO
            title="Unsubscribe Failed | Newsletter Management"
            description="We encountered an error while processing your unsubscribe request. Please try again or contact support."
            canonicalUrl="/unsubscribe"
            keywords="unsubscribe error, newsletter problem, subscription management"
            pageUrl="/unsubscribe"
          />
          <SchemaMarkup type="website" data={unsubscribeSchemaData} />
          <Card className="editorial-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Unsubscribe Failed</CardTitle>
              <CardDescription className="text-[#5C5C5C]">We couldn't process your unsubscribe request.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>

              <div className="mt-4">
                <Alert className="border-[#E8E4DF] bg-[#F5F0EB]">
                  <AlertTitle className="text-[#1A1A1A]">Try Manual Unsubscribe</AlertTitle>
                  <AlertDescription className="text-[#5C5C5C]">
                    The automatic unsubscribe failed. Try the manual unsubscribe button:
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center mt-4">
                  <Button onClick={manuallyUnsubscribe} className="bg-[#C45B3E] hover:bg-[#A84832] text-white">
                    Manually Unsubscribe
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
          title="Successfully Unsubscribed | Newsletter Management"
          description="You have been successfully unsubscribed from the newsletter. You will no longer receive updates from us."
          canonicalUrl="/unsubscribe"
          keywords="unsubscribe successful, newsletter cancelled, email preferences updated"
          pageUrl="/unsubscribe"
        />
        <SchemaMarkup type="website" data={unsubscribeSchemaData} />
        <Card className="editorial-card">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Successfully Unsubscribed</CardTitle>
            <CardDescription className="text-[#5C5C5C]">You have been removed from the newsletter.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6">
              <CheckCircle2 className="h-16 w-16 text-[#C45B3E] mb-4" />
              <p className="text-center mb-4 text-[#1A1A1A]">
                You have successfully unsubscribed from the newsletter.
                You will no longer receive any emails from us.
              </p>
              <p className="text-center text-[#5C5C5C] text-sm">
                We're sorry to see you go. If you have any feedback on how we could improve,
                please feel free to reach out.
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