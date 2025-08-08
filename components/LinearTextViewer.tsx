"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./LinearTextViewer.module.css";

interface LinearTextViewerProps {
  text: string;
}

export default function LinearTextViewer({ text }: LinearTextViewerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={styles.viewer}>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>
          {Math.round(scrollProgress)}% through document
        </div>
        <div className={styles.scrollBar}>
          <div 
            className={styles.scrollThumb} 
            style={{ height: `${Math.max(10, 100 - scrollProgress)}%` }}
          />
        </div>
      </div>
      
      <div className={styles.content} ref={contentRef}>
        <div className={styles.textContent}>
          {text.split('\n\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}