"use client";

import { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import Link from 'next/link';
import styles from './CookieConsent.module.css';
import {
  shouldShowConsentBanner,
  saveConsent,
  ConsentPreferences,
} from '@/lib/consent/consent-manager';
import { CookieSettings } from './CookieSettings';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const shouldShow = shouldShowConsentBanner();
    if (shouldShow) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(preferences);
    closeBanner();
  };

  const handleAcceptEssential = () => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(preferences);
    closeBanner();
  };

  const handleSavePreferences = (preferences: ConsentPreferences) => {
    saveConsent(preferences);
    setShowSettings(false);
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBanner(false);
      setIsClosing(false);
    }, 300);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {showSettings && (
        <CookieSettings
          onClose={() => setShowSettings(false)}
          onSave={handleSavePreferences}
        />
      )}
      
      {showBanner && !showSettings && (
        <div className={`${styles.banner} ${isClosing ? styles.closing : ''}`}>
          <div className={styles.container}>
            <button
              onClick={handleAcceptEssential}
              className={styles.closeButton}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Cookie size={20} />
                </div>
                <h3 className={styles.title}>Cookie Settings</h3>
              </div>

              <p className={styles.description}>
                We use cookies to enhance your browsing experience and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{' '}
                <Link href="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookies" className={styles.link}>
                  Cookie Policy
                </Link>{' '}
                for more information.
              </p>

              <div className={styles.actions}>
                <button
                  onClick={handleAcceptAll}
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  Accept All
                </button>
                <button
                  onClick={handleAcceptEssential}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className={`${styles.button} ${styles.buttonOutline}`}
                >
                  <Settings size={16} />
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}