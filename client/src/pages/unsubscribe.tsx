import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast";

/**
 * Unsubscribe Page
 * 
 * This page handles unsubscribe requests for newsletter subscribers.
 * It receives a token via query parameter and processes the unsubscribe request
 * by calling the API endpoint.
 */
export default function UnsubscribePage() {
  const [location, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { toast } = useToast();
  
  // Extract token from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    setToken(tokenParam);
    
    // Add debug information
    setDebugInfo(`
      Page loaded at: ${new Date().toISOString()}
      URL: ${window.location.href}
      Token: ${tokenParam}
      Hostname: ${window.location.hostname}
      Origin: ${window.location.origin}
    `);
    
    // Log for debugging
    console.log('Unsubscribe page loaded', {
      url: window.location.href,
      token: tokenParam,
      hostname: window.location.hostname,
      origin: window.location.origin
    });
  }, []);
  
  // Function to manually unsubscribe
  const manuallyUnsubscribe = async () => {
    if (!token) return;
    
    try {
      // Construct the direct API URL with full domain
      const apiUrl = `${window.location.origin}/api/newsletter/unsubscribe?token=${token}`;
      
      console.log('Manually unsubscribing with URL:', apiUrl);
      setDebugInfo(prev => prev + `\nAttempting manual unsubscribe at: ${new Date().toISOString()}\nAPI URL: ${apiUrl}`);
      
      // Make the fetch request
      const response = await fetch(apiUrl);
      const result = await response.json();
      
      console.log('Manual unsubscribe result:', result);
      setDebugInfo(prev => prev + `\nAPI Response: ${JSON.stringify(result)}`);
      
      // Show toast with result
      if (result.success) {
        toast({
          title: "Success!",
          description: "You have been successfully unsubscribed from the newsletter.",
        });
        // Force reload the page
        window.location.reload();
      } else {
        toast({
          variant: "destructive",
          title: "Unsubscribe Failed",
          description: result.message || "Failed to process your unsubscribe request",
        });
      }
    } catch (error) {
      console.error('Manual unsubscribe error:', error);
      setDebugInfo(prev => prev + `\nError: ${error instanceof Error ? error.message : String(error)}`);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while trying to unsubscribe",
      });
    }
  };
  
  // If no token is provided, show an error
  if (token === null) {
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Invalid Unsubscribe Request</CardTitle>
            <CardDescription>No unsubscribe token was provided.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                The unsubscribe link you used is invalid. Please check your email for the correct link.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setLocation('/')}>Return to Home</Button>
          </CardFooter>
        </Card>
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
      
      console.log('Automatic unsubscribe attempt with URL:', apiUrl);
      setDebugInfo(prev => prev + `\nAutomatic unsubscribe attempt at: ${new Date().toISOString()}\nAPI URL: ${apiUrl}`);
        
      const response = await fetch(apiUrl);
      const responseJson = await response.json();
      
      console.log('API Response:', responseJson);
      setDebugInfo(prev => prev + `\nAPI Response: ${JSON.stringify(responseJson)}`);
      
      if (!response.ok) {
        throw new Error(responseJson.message || 'Failed to process unsubscribe request');
      }
      
      return responseJson;
    },
    retry: false,
    // Only start the query once we have a token
    enabled: token !== null
  });
  
  // Show loading state with debug button
  if (isLoading) {
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Processing Unsubscribe Request</CardTitle>
            <CardDescription>Please wait while we process your request...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-6">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
            
            <div className="mt-4">
              <Alert>
                <AlertTitle>Is the page stuck loading?</AlertTitle>
                <AlertDescription>
                  Try the manual unsubscribe button below:
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-center mt-4">
                <Button onClick={manuallyUnsubscribe} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Manually Unsubscribe
                </Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-xs overflow-auto max-h-48">
              <p className="font-semibold mb-2">Debug Information:</p>
              <pre className="whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show error state with debug button
  if (isError) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An error occurred while processing your unsubscribe request.';
      
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Unsubscribe Failed</CardTitle>
            <CardDescription>We couldn't process your unsubscribe request.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
            
            <div className="mt-4">
              <Alert>
                <AlertTitle>Try Manual Unsubscribe</AlertTitle>
                <AlertDescription>
                  The automatic unsubscribe failed. Try the manual unsubscribe button:
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-center mt-4">
                <Button onClick={manuallyUnsubscribe} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Manually Unsubscribe
                </Button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-xs overflow-auto max-h-48">
              <p className="font-semibold mb-2">Debug Information:</p>
              <pre className="whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setLocation('/')}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Show success state
  return (
    <div className="container max-w-md py-16">
      <Card>
        <CardHeader>
          <CardTitle>Successfully Unsubscribed</CardTitle>
          <CardDescription>You've been unsubscribed from the newsletter.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-6">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
            <p className="text-center mb-4">
              You've been successfully unsubscribed from my newsletter. I'm sorry to see you go!
            </p>
            <p className="text-center text-muted-foreground">
              You can always resubscribe in the future if you change your mind.
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-xs overflow-auto max-h-48">
            <p className="font-semibold mb-2">Debug Information:</p>
            <pre className="whitespace-pre-wrap">{debugInfo}</pre>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setLocation('/')}>Return to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}