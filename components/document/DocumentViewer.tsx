'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';
import { CoredocDocument, DocumentChunk, DocumentPage, NavigationHistory, BreadcrumbItem } from '@/types/document';

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
          `<span class="keyword-link" data-chunk-id="${targetId}" title="${contextHint}">${match}</span>`
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
            `<span class="keyword-link" data-chunk-id="${targetChunk.id}" title="Click to explore ${keyword}">${keyword}</span>`
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
    if (target.classList.contains('keyword-link')) {
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
              className={`
                cursor-pointer p-2 rounded transition-colors
                ${isCurrentChunk ? 'bg-blue-100 font-bold text-blue-800' : 'hover:bg-gray-100'}
                ${level > 0 ? `ml-${level * 4}` : ''}
              `}
              onClick={() => navigateToChunk(chunk.id)}
            >
              <div className="text-sm">
                {chunk.title || 'Untitled'} ({linkCount} keywords)
              </div>
            </div>
            {renderChunkTree(chunk.id, level + 1, newVisitedIds)}
          </div>
        );
      });
    };

    return (
      <div className="space-y-1">
        {/* Render root chunks first */}
        {rootChunks.map(chunk => {
          const linkCount = chunk.embedded_links?.length || chunk.keywords?.length || 0;
          const isCurrentChunk = currentChunk?.id === chunk.id;
          
          return (
            <div key={chunk.id}>
              <div
                className={`
                  cursor-pointer p-2 rounded transition-colors
                  ${isCurrentChunk ? 'bg-blue-100 font-bold text-blue-800' : 'hover:bg-gray-100'}
                `}
                onClick={() => navigateToChunk(chunk.id)}
              >
                <div className="text-sm">
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
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading document...</div>
      </div>
    );
  }

  return (
    <div className={`flex h-full ${className}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-gray-200 bg-gray-50`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Document Structure</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Document Info */}
          <div className="mb-4 p-3 bg-white rounded-lg border">
            <h3 className="font-medium text-gray-900">{document.document.title}</h3>
            <div className="text-sm text-gray-500 mt-1">
              {document.document.total_chunks || document.document.total_pages || chunks.length} chunks
              {document.document.coverage_percentage && (
                <span> • {document.document.coverage_percentage.toFixed(1)}% coverage</span>
              )}
            </div>
          </div>

          {/* Hierarchy */}
          <div className="overflow-y-auto max-h-96">
            {renderHierarchy()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
            
            {/* Breadcrumbs */}
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => navigateToChunk(item.id)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </button>
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-300">›</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              {currentChunk.title || 'Untitled'}
            </h1>
            <div className="text-sm text-gray-500">
              Level {currentChunk.level || 0} • {currentChunk.character_count} chars
              {currentChunk.metadata?.reading_time_seconds && (
                <span> • {Math.ceil(currentChunk.metadata.reading_time_seconds / 60)}min read</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
          <div 
            className="prose prose-lg max-w-none"
            onClick={handleKeywordClick}
            dangerouslySetInnerHTML={{ __html: renderContent(currentChunk) }}
          />
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={navigateBack}
                disabled={navigationHistory.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              
              <button
                onClick={navigateHome}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Page navigation info */}
              <span className="text-sm text-gray-500">
                Page {chunks.findIndex(c => c.id === currentChunk.id) + 1} of {chunks.length}
              </span>

              {/* Previous/Next navigation */}
              <div className="flex gap-2">
                <button
                  onClick={() => prevChunk && navigateToChunk(prevChunk.id)}
                  disabled={!prevChunk}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  title={prevChunk ? `Previous: ${prevChunk.title}` : 'No previous page'}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <button
                  onClick={() => nextChunk && navigateToChunk(nextChunk.id)}
                  disabled={!nextChunk}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  title={nextChunk ? `Next: ${nextChunk.title}` : 'No next page'}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .keyword-link {
          background-color: #e8f4fd;
          border: 1px solid #3498db;
          padding: 2px 6px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-block;
          text-decoration: none;
          color: #2980b9;
          font-weight: 500;
        }
        
        .keyword-link:hover {
          background-color: #3498db;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default DocumentViewer;