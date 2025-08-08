import FeatureCarousel from "@/components/FeatureCarousel";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.logo}>COREDOC</h1>
          <p className={styles.tagline}>Document intelligence redefined</p>
        </header>
        
        <section className={styles.showcase}>
          <FeatureCarousel />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}