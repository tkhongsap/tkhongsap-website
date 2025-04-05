// Type definitions for Google Analytics gtag
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

// Declare the gtag function
declare function gtag(...args: any[]): void;