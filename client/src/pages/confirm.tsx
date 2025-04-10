import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
            <CardTitle>Invalid Confirmation</CardTitle>
            <CardDescription>No confirmation token was provided.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                The confirmation link you used is invalid. Please check your email for the correct link or request a new confirmation email.
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
  
  // Call the API to confirm subscription
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/api/newsletter/confirm', token],
    queryFn: async () => {
      const response = await fetch(`/api/newsletter/confirm?token=${token}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to confirm subscription');
      }
      
      return response.json();
    },
    retry: false
  });
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Confirming Subscription</CardTitle>
            <CardDescription>Please wait while we confirm your subscription...</CardDescription>
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
      : 'An error occurred while confirming your subscription.';
      
    return (
      <div className="container max-w-md py-16">
        <Card>
          <CardHeader>
            <CardTitle>Confirmation Failed</CardTitle>
            <CardDescription>We couldn't confirm your subscription.</CardDescription>
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
          <CardTitle>Subscription Confirmed!</CardTitle>
          <CardDescription>You're now subscribed to my newsletter.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-6">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
            <p className="text-center mb-4">
              Thank you for confirming your subscription! You'll now receive updates and insights straight to your inbox.
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