import DemoLayout from "@/components/DemoLayout";
import LinearTextViewer from "@/components/LinearTextViewer";
import CoredocDemoViewer from "@/components/CoredocDemoViewer";
import { sampleDocument, sampleCoredoc } from "@/lib/sampleData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./page.module.css";

export default function DemoPage() {
  return (
    <div className={styles.demoPage}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.backButton}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className={styles.title}>COREDOC Live Demo</h1>
          <p className={styles.subtitle}>
            Experience the difference between traditional linear documents and COREDOC's intelligent navigation
          </p>
        </div>
      </header>
      
      <DemoLayout
        leftPanel={<LinearTextViewer text={sampleDocument} />}
        rightPanel={<CoredocDemoViewer data={sampleCoredoc} />}
      />
    </div>
  );
}