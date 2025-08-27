import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | COREDOC",
  description: "Privacy Policy for COREDOC - Learn how we protect your data and respect your privacy.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>

        <section className={styles.section}>
          <h2>Introduction</h2>
          <p>
            COREDOC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and protect information when you visit our website 
            coredoc.live (&quot;the Website&quot;).
          </p>
        </section>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>Contact information when you reach out to us</li>
            <li>Feedback and contributions to our open-source project</li>
            <li>Any other information you choose to provide</li>
          </ul>
          
          <h3>Information Automatically Collected</h3>
          <ul>
            <li>Usage data through Microsoft Clarity (with your consent)</li>
            <li>Technical information such as browser type and device information</li>
            <li>Cookies and similar technologies as described in our <Link href="/cookies" className={styles.link}>Cookie Policy</Link></li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To improve our website and user experience</li>
            <li>To analyze website usage and performance (with your consent)</li>
            <li>To communicate with you about the project</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Cookies and Analytics</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website. 
            We use Microsoft Clarity to understand how visitors interact with our website, which 
            helps us improve user experience and our services.
          </p>
          <p>
            For users in the European Economic Area, UK, and Switzerland, we only use analytics 
            cookies with your explicit consent. You can manage your cookie preferences at any time 
            through our cookie consent banner or by visiting our <Link href="/cookies" className={styles.link}>Cookie Policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
            <li>Objection to processing</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction. However, 
            no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Open Source Considerations</h2>
          <p>
            Please note that contributions to our open-source project on GitHub are public. Any 
            information you include in issues, pull requests, or other public contributions will 
            be visible to all users.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal information, please contact us at:
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