"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import styles from "./CoredocDemoViewer.module.css";

interface Chunk {
  id: string;
  title: string;
  content: string;
  summary: string;
  keywords: Array<{ term: string; importance_score: number }>;
  embedded_links: Array<{
    keyword: string;
    target_page_id: string;
    context_hint: string;
  }>;
  relationships: {
    parent: string | null;
    children: string[];
    prev: string | null;
    next: string | null;
  };
}

interface CoredocData {
  document: {
    title: string;
    total_chunks: number;
    root_chunk_id: string;
  };
  chunks: Chunk[];
}

interface CoredocDemoViewerProps {
  data: CoredocData;
}

export default function CoredocDemoViewer({ data }: CoredocDemoViewerProps) {
  const [currentChunkId, setCurrentChunkId] = useState(data.document.root_chunk_id);
  
  const currentChunk = data.chunks.find(chunk => chunk.id === currentChunkId);
  
  if (!currentChunk) return null;

  const navigateToChunk = (chunkId: string) => {
    setCurrentChunkId(chunkId);
  };

  const highlightKeywords = (content: string) => {
    let highlightedContent = content;
    
    currentChunk.embedded_links.forEach(link => {
      const regex = new RegExp(`\\b${escapeRegex(link.keyword)}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(
        regex,
        `<span class="${styles.keyword}" data-target="${link.target_page_id}" title="${link.context_hint}">$&</span>`
      );
    });
    
    return highlightedContent;
  };

  const escapeRegex = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains(styles.keyword)) {
      const targetId = target.getAttribute('data-target');
      if (targetId) {
        navigateToChunk(targetId);
      }
    }
  };

  return (
    <div className={styles.viewer}>
      <div className={styles.breadcrumbs}>
        {currentChunk.title}
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.chunkTitle}>{currentChunk.title}</h2>
        
        {currentChunk.summary && (
          <div className={styles.summary}>{currentChunk.summary}</div>
        )}
        
        <div className={styles.metadata}>
          <span>Keywords: {currentChunk.keywords.length}</span>
          <span>Links: {currentChunk.embedded_links.length}</span>
        </div>
        
        <div 
          className={styles.chunkContent}
          onClick={handleContentClick}
          dangerouslySetInnerHTML={{ __html: highlightKeywords(currentChunk.content) }}
        />
        
        {currentChunk.embedded_links.length > 0 && (
          <div className={styles.relatedLinks}>
            <h3 className={styles.relatedTitle}>Related Sections</h3>
            <div className={styles.linkGrid}>
              {currentChunk.embedded_links.map((link, index) => {
                const targetChunk = data.chunks.find(c => c.id === link.target_page_id);
                return targetChunk ? (
                  <button
                    key={index}
                    className={styles.linkButton}
                    onClick={() => navigateToChunk(link.target_page_id)}
                  >
                    {targetChunk.title}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={() => currentChunk.relationships.prev && navigateToChunk(currentChunk.relationships.prev)}
          disabled={!currentChunk.relationships.prev}
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => navigateToChunk(data.document.root_chunk_id)}
        >
          <Home size={20} />
          Home
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => currentChunk.relationships.next && navigateToChunk(currentChunk.relationships.next)}
          disabled={!currentChunk.relationships.next}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}