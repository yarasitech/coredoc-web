import type { Metadata } from "next";
import Link from "next/link";
import styles from "./cookies.module.css";

export const metadata: Metadata = {
  title: "Cookie Policy | COREDOC",
  description: "Cookie Policy for COREDOC - Learn how we use cookies and how to manage your preferences.",
};

export default function CookiePolicyPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Cookie Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

        <section className={styles.section}>
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. 
            They help websites function properly, remember your preferences, and understand how you 
            interact with the site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How We Use Cookies</h2>
          <p>COREDOC uses cookies to:</p>
          <ul>
            <li>Remember your cookie consent preferences</li>
            <li>Analyze how visitors use our website (with your consent)</li>
            <li>Improve website performance and user experience</li>
            <li>Ensure the security and integrity of our services</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Types of Cookies We Use</h2>
          
          <div className={styles.cookieType}>
            <h3>Necessary Cookies</h3>
            <p>
              These cookies are essential for the website to function properly. They cannot be 
              disabled in our systems.
            </p>
            <div className={styles.cookieDetails}>
              <p><strong>Cookies used:</strong></p>
              <ul>
                <li>
                  <code>coredoc_cookie_consent</code> - Stores your cookie consent preferences 
                  (expires after 365 days)
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.cookieType}>
            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting 
              and reporting information anonymously. We only use these cookies with your consent.
            </p>
            <div className={styles.cookieDetails}>
              <p><strong>Service used:</strong> Microsoft Clarity</p>
              <p><strong>Purpose:</strong> Session recordings and heatmaps to help us understand user behavior and improve our website</p>
              <p><strong>Cookies set by Microsoft Clarity:</strong></p>
              <ul>
                <li><code>_clck</code> - User ID and preferences (1 year)</li>
                <li><code>_clsk</code> - Session ID (1 day)</li>
              </ul>
            </div>
          </div>

          <div className={styles.cookieType}>
            <h3>Marketing Cookies</h3>
            <p>
              We do not currently use marketing cookies on our website. If we add them in the 
              future, we will update this policy and request your consent.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Managing Your Cookie Preferences</h2>
          <p>You can manage your cookie preferences at any time by:</p>
          <ul>
            <li>Clicking the cookie settings button in the cookie banner when you visit our website</li>
            <li>Clearing your browser cookies and refreshing the page</li>
            <li>Configuring your browser settings to block or delete cookies</li>
          </ul>
          <p>
            <strong>Note for EU/UK/Switzerland visitors:</strong> We will ask for your explicit 
            consent before using any analytics cookies, in compliance with GDPR and other privacy 
            regulations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Withdraw your consent for analytics cookies at any time</li>
            <li>Access information about the cookies we use</li>
            <li>Request deletion of data collected through cookies</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Browser Cookie Settings</h2>
          <p>
            You can control and/or delete cookies through your browser settings. Please note that 
            removing or blocking cookies may impact your user experience and parts of our website 
            may no longer be fully accessible.
          </p>
          <p>Here are instructions for managing cookies in popular browsers:</p>
          <ul>
            <li>
              <a 
                href="https://support.google.com/chrome/answer/95647" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a 
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a 
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Safari
              </a>
            </li>
            <li>
              <a 
                href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:privacy@coredoc.live" className={styles.link}>privacy@coredoc.live</a>
          </p>
        </section>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}