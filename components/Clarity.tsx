"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { hasConsent } from '@/lib/consent/consent-manager';

export default function Clarity() {
  const [shouldLoadClarity, setShouldLoadClarity] = useState(false);

  useEffect(() => {
    // Check consent on mount
    setShouldLoadClarity(hasConsent('analytics'));

    // Listen for consent changes
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { preferences } = customEvent.detail;
      setShouldLoadClarity(preferences.analytics);
      
      // Send consent signal to Clarity if it's loaded
      if (preferences.analytics && (window as any).clarity) {
        (window as any).clarity('consent');
      }
    };

    window.addEventListener('consentUpdated', handleConsentUpdate);
    window.addEventListener('consentRevoked', () => setShouldLoadClarity(false));

    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdate);
      window.removeEventListener('consentRevoked', () => setShouldLoadClarity(false));
    };
  }, []);

  if (!shouldLoadClarity) {
    return null;
  }

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "srt9q71p7f");
        `,
      }}
      onLoad={() => {
        // Send consent signal after loading
        if ((window as any).clarity) {
          (window as any).clarity('consent');
        }
      }}
    />
  );
}