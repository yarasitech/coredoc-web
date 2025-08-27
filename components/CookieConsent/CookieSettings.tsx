"use client";

import { useState, useEffect } from 'react';
import { X, Cookie, BarChart2, Target } from 'lucide-react';
import Link from 'next/link';
import styles from './CookieSettings.module.css';
import {
  getStoredConsent,
  ConsentPreferences,
} from '@/lib/consent/consent-manager';

interface CookieSettingsProps {
  onClose: () => void;
  onSave: (preferences: ConsentPreferences) => void;
}

export function CookieSettings({ onClose, onSave }: CookieSettingsProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setPreferences(storedConsent.preferences);
    }
  }, []);

  const handleToggle = (type: keyof ConsentPreferences) => {
    if (type === 'necessary') return; // Cannot toggle necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cookie Preferences</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p className={styles.subtitle}>
          Manage your cookie preferences. You can enable or disable different types of cookies below.
        </p>

        <div className={styles.content}>
          {/* Necessary Cookies */}
          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryInfo}>
                <div className={`${styles.categoryIcon} ${styles.iconGreen}`}>
                  <Cookie size={16} />
                </div>
                <div>
                  <h3 className={styles.categoryTitle}>Necessary Cookies</h3>
                  <p className={styles.categoryDescription}>
                    These cookies are essential for the website to function properly. They enable core 
                    functionality such as security, network management, and accessibility.
                  </p>
                  <span className={styles.categoryStatus}>Always Active</span>
                </div>
              </div>
              <label className={`${styles.switch} ${styles.switchDisabled}`}>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryInfo}>
                <div className={`${styles.categoryIcon} ${styles.iconBlue}`}>
                  <BarChart2 size={16} />
                </div>
                <div>
                  <h3 className={styles.categoryTitle}>Analytics Cookies</h3>
                  <p className={styles.categoryDescription}>
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. We use Microsoft Clarity to analyze user behavior 
                    and improve our services.
                  </p>
                  <span className={styles.categoryStatus}>Microsoft Clarity</span>
                </div>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handleToggle('analytics')}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className={styles.category}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryInfo}>
                <div className={`${styles.categoryIcon} ${styles.iconPurple}`}>
                  <Target size={16} />
                </div>
                <div>
                  <h3 className={styles.categoryTitle}>Marketing Cookies</h3>
                  <p className={styles.categoryDescription}>
                    These cookies are used to track visitors across websites. The intention is to display 
                    ads that are relevant and engaging for individual users. Currently, we do not use 
                    marketing cookies.
                  </p>
                  <span className={styles.categoryStatus}>None currently active</span>
                </div>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          <div className={styles.info}>
            <p>
              For more information about how we use cookies and your privacy rights, please read our{' '}
              <Link href="/privacy" className={styles.link}>
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/cookies" className={styles.link}>
                Cookie Policy
              </Link>.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}