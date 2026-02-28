import { useEffect } from "react";

/**
 * Google Analytics component with click tracking for key interactions.
 * Set GA_MEASUREMENT_ID env var or replace the fallback below.
 */
export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID =
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_GA_MEASUREMENT_ID) ||
    "G-XXXXXXXXXX"; // Replace with real ID

  useEffect(() => {
    // Click tracking via data-track attributes
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-track]") as HTMLElement | null;
      if (!el) return;
      const action = el.getAttribute("data-track") || "click";
      const label =
        el.getAttribute("aria-label") ||
        el.textContent?.trim().slice(0, 50) ||
        "";
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", action, {
          event_category: "engagement",
          event_label: label,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        id="gtag-script"
      />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
