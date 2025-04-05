/**
 * Google Analytics component for tracking page views and user interactions
 * This script is loaded asynchronously and doesn't block page rendering
 */
export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-MEASUREMENT_ID'; // Replace with actual GA measurement ID

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        id="gtag-script"
      />
      
      {/* Initialize Google Analytics */}
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure'
            });
          `
        }}
      />
    </>
  );
}