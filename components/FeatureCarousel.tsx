"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./FeatureCarousel.module.css";

interface Feature {
  title: string;
  description: string;
  visual: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Hierarchical Structure",
    description: "Transform linear documents into navigable hierarchies",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.docTree}>
          <div className={styles.treeNode}>
            <span className={styles.nodeTitle}>Document Root</span>
            <div className={styles.treeChildren}>
              <div className={styles.treeNode}>
                <span className={styles.nodeTitle}>Chapter 1</span>
                <div className={styles.treeChildren}>
                  <div className={styles.treeNode}>
                    <span className={styles.nodeTitle}>Section 1.1</span>
                  </div>
                  <div className={styles.treeNode}>
                    <span className={styles.nodeTitle}>Section 1.2</span>
                  </div>
                </div>
              </div>
              <div className={styles.treeNode}>
                <span className={styles.nodeTitle}>Chapter 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Smart Linking",
    description: "Keywords automatically linked between related sections",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.linkDemo}>
          <div className={styles.textBlock}>
            <p>The <span className={styles.keyword}>algorithm</span> processes documents...</p>
          </div>
          <div className={styles.linkArrow}>→</div>
          <div className={styles.textBlock}>
            <p>Learn more about the <span className={styles.keyword}>algorithm</span> implementation...</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Non-Linear Navigation",
    description: "Jump between related content without scrolling",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.navDemo}>
          <div className={styles.navPath}>
            <div className={styles.navNode}>Introduction</div>
            <div className={styles.navArrow}>→</div>
            <div className={styles.navNode}>Concepts</div>
            <div className={styles.navArrow}>↗</div>
            <div className={styles.navNode}>Examples</div>
          </div>
          <div className={styles.navPath}>
            <div className={styles.navNode}>Overview</div>
            <div className={styles.navArrow}>↘</div>
            <div className={styles.navNode}>Details</div>
            <div className={styles.navArrow}>→</div>
            <div className={styles.navNode}>References</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Knowledge Graph",
    description: "Documents become interconnected knowledge networks",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.graphDemo}>
          <div className={styles.graphNode} style={{ top: "20%", left: "50%" }}>
            <span>Main Topic</span>
          </div>
          <div className={styles.graphNode} style={{ top: "50%", left: "20%" }}>
            <span>Concept A</span>
          </div>
          <div className={styles.graphNode} style={{ top: "50%", left: "80%" }}>
            <span>Concept B</span>
          </div>
          <div className={styles.graphNode} style={{ top: "80%", left: "35%" }}>
            <span>Example 1</span>
          </div>
          <div className={styles.graphNode} style={{ top: "80%", left: "65%" }}>
            <span>Example 2</span>
          </div>
          <svg className={styles.graphLines}>
            <line x1="50%" y1="30%" x2="20%" y2="50%" />
            <line x1="50%" y1="30%" x2="80%" y2="50%" />
            <line x1="20%" y1="60%" x2="35%" y2="80%" />
            <line x1="80%" y1="60%" x2="65%" y2="80%" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Clean Interface",
    description: "Beautiful, distraction-free reading experience",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.interfaceDemo}>
          <div className={styles.interfaceHeader}>
            <div className={styles.breadcrumbs}>Document › Chapter › Section</div>
          </div>
          <div className={styles.interfaceContent}>
            <h3 className={styles.contentTitle}>Section Title</h3>
            <p className={styles.contentText}>
              Clean, focused content with <span className={styles.keyword}>highlighted keywords</span> for easy navigation...
            </p>
          </div>
          <div className={styles.interfaceNav}>
            <span>← Previous</span>
            <span>Next →</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContent}>
        <div className={styles.slideContainer}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.slide} ${
                index === currentIndex ? styles.slideActive : ""
              }`}
            >
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div className={styles.featureVisual}>{feature.visual}</div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={goToPrevious}
          aria-label="Previous feature"
        >
          <ChevronLeft />
        </button>

        <button
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={goToNext}
          aria-label="Next feature"
        >
          <ChevronRight />
        </button>
      </div>

      <div className={styles.indicators}>
        {features.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.indicatorActive : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}