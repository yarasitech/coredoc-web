"use client";

import { ReactNode } from "react";
import styles from "./DemoLayout.module.css";

interface DemoLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export default function DemoLayout({ leftPanel, rightPanel }: DemoLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.splitView}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Traditional Linear Document</h2>
            <p className={styles.panelSubtitle}>Scroll to navigate</p>
          </div>
          <div className={styles.panelContent}>
            {leftPanel}
          </div>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>COREDOC Navigation</h2>
            <p className={styles.panelSubtitle}>Click keywords to jump between sections</p>
          </div>
          <div className={styles.panelContent}>
            {rightPanel}
          </div>
        </div>
      </div>
    </div>
  );
}