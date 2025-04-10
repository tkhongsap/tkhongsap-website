import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  
  // Extract token from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    setToken(tokenParam);
  }, []);
  
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
        
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process unsubscribe request');
      }
      
      return response.json();
    },
    retry: false,
    // Only start the query once we have a token
    enabled: token !== null
  });
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Processing Unsubscribe Request</CardTitle>
            <CardDescription>Please wait while we process your request...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show error state
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
        </CardContent>
        <CardFooter>
          <Button onClick={() => setLocation('/')}>Return to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}