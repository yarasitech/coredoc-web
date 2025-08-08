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
    title: "The Linear Document Problem",
    description: "Traditional documents trap information in endless scrolling. Finding related content means hunting through pages of text.",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.problemDemo}>
          <div className={styles.linearDoc}>
            <div className={styles.scrollBar}>
              <div className={styles.scrollThumb} style={{ height: "10%", top: "20%" }} />
            </div>
            <div className={styles.docContent}>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━━━━━━</div>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━━━</div>
              <div className={styles.contentLine}>Looking for <span className={styles.keyword}>specific info</span>?</div>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━━━━━━</div>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━</div>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━━━━</div>
              <div className={styles.searchIndicator}>↓ Keep scrolling... ↓</div>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━━━</div>
              <div className={styles.contentLine} style={{ opacity: 0.3 }}>━━━━━━━━━━━━━━━</div>
            </div>
          </div>
          <div className={styles.vs}>VS</div>
          <div className={styles.coredocDoc}>
            <div className={styles.nodeConnected}>
              <span className={styles.keyword}>specific info</span>
              <div className={styles.instantLinks}>
                <div>→ Related Topic A</div>
                <div>→ Example B</div>
                <div>→ Reference C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Transform Documents into Knowledge Graphs",
    description: "COREDOC breaks documents into smart chunks, automatically discovers relationships, and enables instant navigation between related concepts.",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.transformDemo}>
          <div className={styles.beforeDoc}>
            <div className={styles.docIcon}>📄</div>
            <div className={styles.docLabel}>Linear Document</div>
          </div>
          <div className={styles.transformArrow}>
            <svg width="60" height="40" viewBox="0 0 60 40">
              <path d="M 10 20 L 40 20" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 40 20 L 35 15 M 40 20 L 35 25" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="15" cy="20" r="2" fill="currentColor" />
              <circle cx="25" cy="20" r="2" fill="currentColor" />
              <circle cx="35" cy="20" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.afterGraph}>
            <div className={styles.miniGraph}>
              <div className={styles.miniNode} style={{ top: "20%", left: "50%" }} />
              <div className={styles.miniNode} style={{ top: "50%", left: "20%" }} />
              <div className={styles.miniNode} style={{ top: "50%", left: "80%" }} />
              <div className={styles.miniNode} style={{ top: "80%", left: "35%" }} />
              <div className={styles.miniNode} style={{ top: "80%", left: "65%" }} />
              <svg className={styles.miniLines}>
                <line x1="50%" y1="25%" x2="20%" y2="50%" />
                <line x1="50%" y1="25%" x2="80%" y2="50%" />
                <line x1="20%" y1="55%" x2="35%" y2="80%" />
                <line x1="80%" y1="55%" x2="65%" y2="80%" />
              </svg>
            </div>
            <div className={styles.docLabel}>Knowledge Graph</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "The COREDOC Algorithm",
    description: "1) Extract structure 2) Create optimal chunks 3) Identify keywords 4) Build relationships 5) Generate navigable output",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.algorithmFlow}>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepIcon}>📋</div>
            <div className={styles.stepLabel}>Extract Structure</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepIcon}>✂️</div>
            <div className={styles.stepLabel}>Create Chunks</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepIcon}>🔍</div>
            <div className={styles.stepLabel}>Find Keywords</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepIcon}>🔗</div>
            <div className={styles.stepLabel}>Build Links</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepIcon}>🚀</div>
            <div className={styles.stepLabel}>Output JSON</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Smart Document Chunking",
    description: "Preserves document hierarchy while creating bite-sized, interconnected pieces of 500-2000 characters.",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.chunkingDemo}>
          <div className={styles.originalDoc}>
            <div className={styles.docSection} style={{ height: "100%" }}>
              <div className={styles.sectionTitle}>Long Document</div>
              <div className={styles.sectionContent}>
                <div style={{ height: "20%", background: "var(--color-gray-100)" }} />
                <div style={{ height: "30%", background: "var(--color-gray-200)" }} />
                <div style={{ height: "25%", background: "var(--color-gray-100)" }} />
                <div style={{ height: "25%", background: "var(--color-gray-200)" }} />
              </div>
            </div>
          </div>
          <div className={styles.chunkArrows}>
            <div>→</div>
            <div>→</div>
            <div>→</div>
            <div>→</div>
          </div>
          <div className={styles.chunkedDoc}>
            <div className={styles.chunk}>
              <div className={styles.chunkHeader}>Chunk 1</div>
              <div className={styles.chunkSize}>850 chars</div>
            </div>
            <div className={styles.chunk}>
              <div className={styles.chunkHeader}>Chunk 2</div>
              <div className={styles.chunkSize}>1,200 chars</div>
            </div>
            <div className={styles.chunk}>
              <div className={styles.chunkHeader}>Chunk 3</div>
              <div className={styles.chunkSize}>950 chars</div>
            </div>
            <div className={styles.chunk}>
              <div className={styles.chunkHeader}>Chunk 4</div>
              <div className={styles.chunkSize}>1,100 chars</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Intelligent Cross-References",
    description: "Natural language processing identifies important terms and creates meaningful connections between related sections.",
    visual: (
      <div className={styles.visualDemo}>
        <div className={styles.nlpDemo}>
          <div className={styles.textAnalysis}>
            <div className={styles.textSample}>
              "The <span className={styles.detectedKeyword}>neural network</span> architecture 
              uses <span className={styles.detectedKeyword}>backpropagation</span> to optimize 
              the <span className={styles.detectedKeyword}>loss function</span>..."
            </div>
            <div className={styles.analysisArrow}>↓</div>
            <div className={styles.keywordList}>
              <div className={styles.keywordItem}>
                <span className={styles.keywordBadge}>neural network</span>
                <span className={styles.keywordScore}>0.92</span>
              </div>
              <div className={styles.keywordItem}>
                <span className={styles.keywordBadge}>backpropagation</span>
                <span className={styles.keywordScore}>0.87</span>
              </div>
              <div className={styles.keywordItem}>
                <span className={styles.keywordBadge}>loss function</span>
                <span className={styles.keywordScore}>0.85</span>
              </div>
            </div>
          </div>
          <div className={styles.connectionVisual}>
            <div className={styles.connectedChunk} style={{ top: "10%", left: "20%" }}>
              <div className={styles.chunkMini}>Chunk A</div>
            </div>
            <div className={styles.connectedChunk} style={{ top: "10%", left: "80%" }}>
              <div className={styles.chunkMini}>Chunk B</div>
            </div>
            <div className={styles.connectedChunk} style={{ top: "70%", left: "50%" }}>
              <div className={styles.chunkMini}>Chunk C</div>
            </div>
            <svg className={styles.connectionLines}>
              <line x1="30%" y1="20%" x2="70%" y2="20%" strokeDasharray="4 2" />
              <line x1="25%" y1="25%" x2="45%" y2="65%" strokeDasharray="4 2" />
              <line x1="75%" y1="25%" x2="55%" y2="65%" strokeDasharray="4 2" />
            </svg>
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