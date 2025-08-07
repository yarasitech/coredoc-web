'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';
import { CoredocDocument, DocumentChunk, DocumentPage, NavigationHistory, BreadcrumbItem } from '@/types/document';
import styles from './DocumentViewer.module.css';

interface DocumentViewerProps {
  document: CoredocDocument;
  className?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, className = '' }) => {
  const [currentChunk, setCurrentChunk] = useState<DocumentChunk | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  
  // Ref to track current chunk without causing re-renders
  const currentChunkRef = useRef<DocumentChunk | null>(null);

  // Get chunks array (V3) or pages array (V2 compatibility)
  // Convert V2 pages to V3 chunk format for consistent handling
  const chunks: DocumentChunk[] = React.useMemo(() => 
    document.chunks || 
    (document.pages || []).map((page: DocumentPage) => ({
      id: page.id,
      content: page.content,
      summary: page.title || 'Untitled', // Use title as summary for V2 compatibility
      context: page.context || '',
      character_count: page.character_count,
      level: page.level || 0,
      title: page.title || 'Untitled',
      embedded_links: page.embedded_links || [],
      parent_page_id: page.parent_page_id || null
    })) || [], [document.chunks, document.pages]);
  
  console.log('DocumentViewer received document:', document);
  console.log('Processed chunks:', chunks);
  
  // Get root chunk ID
  const rootChunkId = document.document.root_chunk_id || document.document.root_page_id;

  // Sync currentChunk with ref
  useEffect(() => {
    currentChunkRef.current = currentChunk;
  }, [currentChunk]);

  const updateBreadcrumbs = useCallback((chunk: DocumentChunk) => {
    const path: BreadcrumbItem[] = [];
    let currentPathChunk: DocumentChunk | null = chunk;
    const visitedIds = new Set<string>(); // Track visited chunks to prevent infinite loops
    const MAX_DEPTH = 50; // Maximum depth as safety measure
    let depth = 0;

    while (currentPathChunk && depth < MAX_DEPTH) {
      // Check for circular reference
      if (visitedIds.has(currentPathChunk.id)) {
        console.warn(`Circular reference detected in breadcrumb path at chunk: ${currentPathChunk.id}`);
        break;
      }

      visitedIds.add(currentPathChunk.id);
      path.unshift({
        id: currentPathChunk.id,
        title: currentPathChunk.title || 'Untitled',
        level: currentPathChunk.level || 0
      });

      // V3 uses relationships.parent, V2 uses parent_page_id
      const parentId: string | null | undefined = currentPathChunk.relationships?.parent || currentPathChunk.parent_page_id;
      if (parentId) {
        currentPathChunk = chunks.find(c => c.id === parentId) || null;
      } else {
        currentPathChunk = null;
      }
      
      depth++;
    }

    if (depth >= MAX_DEPTH) {
      console.error('Maximum breadcrumb depth exceeded - possible infinite loop');
    }

    setBreadcrumbs(path);
  }, [chunks]);

  const navigateToChunk = useCallback((chunkId: string) => {
    const chunk = chunks.find(c => c.id === chunkId);
    if (!chunk) {
      console.error('Chunk not found:', chunkId);
      return;
    }

    // Add current chunk to history if navigating to a new chunk
    const current = currentChunkRef.current;
    if (current && current.id !== chunkId) {
      setNavigationHistory(prev => [
        ...prev,
        {
          chunkId: current.id,
          title: current.title || 'Untitled',
          timestamp: Date.now()
        }
      ]);
    }

    setCurrentChunk(chunk);
    updateBreadcrumbs(chunk);
  }, [chunks, updateBreadcrumbs]);

  useEffect(() => {
    if (chunks.length > 0) {
      // Try to find chunk by rootChunkId first
      if (rootChunkId) {
        const rootChunk = chunks.find(c => c.id === rootChunkId);
        if (rootChunk) {
          navigateToChunk(rootChunkId);
          return;
        }
      }
      
      // Fallback: find the first chunk with no parent (root level)
      const rootChunk = chunks.find(c => 
        (c.relationships?.parent === null || c.relationships?.parent === undefined) &&
        (c.parent_page_id === null || c.parent_page_id === undefined) &&
        (c.level === 0 || c.level === undefined)
      );
      
      if (rootChunk) {
        navigateToChunk(rootChunk.id);
      } else if (chunks[0]) {
        // Last resort: use the first chunk
        navigateToChunk(chunks[0].id);
      }
    }
  }, [rootChunkId, chunks, navigateToChunk]);

  const navigateBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const previous = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      
      const chunk = chunks.find(c => c.id === previous.chunkId);
      if (chunk) {
        setCurrentChunk(chunk);
        updateBreadcrumbs(chunk);
      }
    }
  }, [navigationHistory, chunks, updateBreadcrumbs]);

  const navigateHome = useCallback(() => {
    if (rootChunkId) {
      setNavigationHistory([]);
      navigateToChunk(rootChunkId);
    }
  }, [rootChunkId, navigateToChunk]);

  // Find next and previous siblings
  const getSiblingChunks = useCallback(() => {
    if (!currentChunk) return { next: null, prev: null };

    // Use relationships if available (V3 format)
    if (currentChunk.relationships) {
      const next = currentChunk.relationships.next ? 
        chunks.find(c => c.id === currentChunk.relationships?.next) : null;
      const prev = currentChunk.relationships.prev ?
        chunks.find(c => c.id === currentChunk.relationships?.prev) : null;
      return { next, prev };
    }

    // Fallback: find siblings through parent (V2 format)
    const parentId = currentChunk.parent_page_id;
    if (!parentId) return { next: null, prev: null };

    const siblings = chunks.filter(c => 
      (c.parent_page_id === parentId || c.relationships?.parent === parentId)
    );
    
    const currentIndex = siblings.findIndex(c => c.id === currentChunk.id);
    return {
      next: currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null,
      prev: currentIndex > 0 ? siblings[currentIndex - 1] : null
    };
  }, [currentChunk, chunks]);

  const { next: nextChunk, prev: prevChunk } = getSiblingChunks();

  const renderContent = (chunk: DocumentChunk): string => {
    let content = chunk.content;

    // Handle embedded_links
    if (chunk.embedded_links && Array.isArray(chunk.embedded_links)) {
      // Sort links by length (descending) to handle overlapping keywords properly
      const sortedLinks = [...chunk.embedded_links].sort((a, b) => 
        b.keyword.length - a.keyword.length
      );

      sortedLinks.forEach(link => {
        const keyword = link.keyword;
        const targetId = link.target_page_id;
        const contextHint = link.context_hint || `Click to explore ${keyword}`;
        
        // Replace the keyword with a clickable link
        const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
        content = content.replace(regex, (match) => 
          `<span class="${styles.keywordLink}" data-chunk-id="${targetId}" title="${contextHint}">${match}</span>`
        );
      });
    }

    // Handle V3 keywords as fallback (array of keyword objects)
    if (!chunk.embedded_links && chunk.keywords && Array.isArray(chunk.keywords)) {
      chunk.keywords.forEach(keywordObj => {
        const keyword = keywordObj.term;
        if (!keyword) return;

        // Find related chunk by keyword
        const targetChunk = chunks.find(c => 
          c.title && 
          c.title.toLowerCase().includes(keyword.toLowerCase()) && 
          c.id !== chunk.id
        );

        if (targetChunk) {
          const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
          content = content.replace(regex, 
            `<span class="${styles.keywordLink}" data-chunk-id="${targetChunk.id}" title="Click to explore ${keyword}">${keyword}</span>`
          );
        }
      });
    }

    return content;
  };

  const escapeRegex = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const handleKeywordClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(styles.keywordLink)) {
      const chunkId = target.getAttribute('data-chunk-id');
      if (chunkId) {
        navigateToChunk(chunkId);
      }
    }
  };

  const renderHierarchy = () => {
    const chunksByParent: Record<string, DocumentChunk[]> = {};
    const rootChunks: DocumentChunk[] = [];
    
    chunks.forEach(chunk => {
      const parentId = chunk.relationships?.parent || chunk.parent_page_id;
      
      if (!parentId) {
        // This is a root chunk
        rootChunks.push(chunk);
      } else {
        if (!chunksByParent[parentId]) {
          chunksByParent[parentId] = [];
        }
        chunksByParent[parentId].push(chunk);
      }
    });

    const renderChunkTree = (parentId: string, level: number = 0, visitedIds: Set<string> = new Set()): React.ReactNode => {
      // Prevent infinite recursion
      if (visitedIds.has(parentId)) {
        console.warn(`Circular reference detected in chunk tree at parent: ${parentId}`);
        return null;
      }
      
      // Maximum depth protection
      if (level > 20) {
        console.warn(`Maximum tree depth exceeded at parent: ${parentId}`);
        return null;
      }
      
      const newVisitedIds = new Set(visitedIds);
      newVisitedIds.add(parentId);
      
      const chunkList = chunksByParent[parentId] || [];
      
      return chunkList.map(chunk => {
        const linkCount = chunk.embedded_links?.length || chunk.keywords?.length || 0;
        const isCurrentChunk = currentChunk?.id === chunk.id;
        
        return (
          <div key={chunk.id}>
            <div
              className={`${styles.chunkItem} ${
                isCurrentChunk ? styles.chunkItemActive : ''
              } ${level > 0 ? styles.chunkItemNested : ''}`}
              style={{ marginLeft: `${level * 24}px` }}
              onClick={() => navigateToChunk(chunk.id)}
            >
              <div>
                {chunk.title || 'Untitled'} ({linkCount} keywords)
              </div>
            </div>
            {renderChunkTree(chunk.id, level + 1, newVisitedIds)}
          </div>
        );
      });
    };

    return (
      <div className={styles.hierarchy}>
        {/* Render root chunks first */}
        {rootChunks.map(chunk => {
          const linkCount = chunk.embedded_links?.length || chunk.keywords?.length || 0;
          const isCurrentChunk = currentChunk?.id === chunk.id;
          
          return (
            <div key={chunk.id}>
              <div
                className={`${styles.chunkItem} ${
                  isCurrentChunk ? styles.chunkItemActive : ''
                }`}
                onClick={() => navigateToChunk(chunk.id)}
              >
                <div>
                  {chunk.title || 'Untitled'} ({linkCount} keywords)
                </div>
              </div>
              {renderChunkTree(chunk.id, 1, new Set([chunk.id]))}
            </div>
          );
        })}
      </div>
    );
  };

  if (!currentChunk) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingText}>Loading document...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarClosed : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Document Structure</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className={styles.closeButton}
            >
              <X />
            </button>
          </div>
          
          {/* Document Info */}
          <div className={styles.documentInfo}>
            <h3 className={styles.documentTitle}>{document.document.title}</h3>
            <div className={styles.documentMeta}>
              {document.document.total_chunks || document.document.total_pages || chunks.length} chunks
              {document.document.coverage_percentage && (
                <span> • {document.document.coverage_percentage.toFixed(1)}% coverage</span>
              )}
            </div>
          </div>

          {/* Hierarchy */}
          {renderHierarchy()}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.contentHeader}>
          <div className={styles.breadcrumbs}>
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className={styles.menuButton}
              >
                <Menu />
              </button>
            )}
            
            {/* Breadcrumbs */}
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => navigateToChunk(item.id)}
                  className={styles.breadcrumbItem}
                >
                  {item.title}
                </button>
                {index < breadcrumbs.length - 1 && (
                  <span className={styles.breadcrumbSeparator}>›</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className={styles.headerContent}>
            <h1 className={styles.chunkTitle}>
              {currentChunk.title || 'Untitled'}
            </h1>
            <div className={styles.chunkMeta}>
              Level {currentChunk.level || 0} • {currentChunk.character_count} chars
              {currentChunk.metadata?.reading_time_seconds && (
                <span> • {Math.ceil(currentChunk.metadata.reading_time_seconds / 60)}min read</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentArea}>
          <div className={styles.contentWrapper}>
            <div 
              className={styles.prose}
              onClick={handleKeywordClick}
              dangerouslySetInnerHTML={{ __html: renderContent(currentChunk) }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigationFooter}>
          <div className={styles.navigationContent}>
            <div className={styles.navigationButtons}>
              <button
                onClick={navigateBack}
                disabled={navigationHistory.length === 0}
                className={`${styles.navButton} ${styles.navButtonPrimary}`}
              >
                <ChevronLeft />
                Back
              </button>
              
              <button
                onClick={navigateHome}
                className={`${styles.navButton} ${styles.navButtonSecondary}`}
              >
                <Home />
                Home
              </button>
            </div>

            <div className={styles.navigationInfo}>
              {/* Page navigation info */}
              <span className={styles.pageInfo}>
                Page {chunks.findIndex(c => c.id === currentChunk.id) + 1} of {chunks.length}
              </span>

              {/* Previous/Next navigation */}
              <div className={styles.pageNavigation}>
                <button
                  onClick={() => prevChunk && navigateToChunk(prevChunk.id)}
                  disabled={!prevChunk}
                  className={`${styles.navButton} ${styles.navButtonSecondary}`}
                  title={prevChunk ? `Previous: ${prevChunk.title}` : 'No previous page'}
                >
                  <ChevronLeft />
                  Previous
                </button>
                
                <button
                  onClick={() => nextChunk && navigateToChunk(nextChunk.id)}
                  disabled={!nextChunk}
                  className={`${styles.navButton} ${styles.navButtonSecondary}`}
                  title={nextChunk ? `Next: ${nextChunk.title}` : 'No next page'}
                >
                  Next
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;