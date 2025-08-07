// Coredoc Document Type Definitions
// Compatible with both V2 and V3 formats

export interface ChunkMetadata {
  original_position: number;
  original_length: number;
  structural_type: string;
  heading_hierarchy: string[];
  reading_time_seconds: number;
}

export interface ChunkRelationships {
  parent: string | null;
  children: string[];
  prev: string | null;
  next: string | null;
  references: string[];
}

export interface Keyword {
  term: string;
  positions: number[];
  importance_score: number;
}

export interface EmbeddedLink {
  keyword: string;
  target_page_id: string;
  context_hint: string;
}

// V3 Chunk format (current)
export interface DocumentChunk {
  id: string;
  content: string;
  summary: string;
  context: string;
  metadata?: ChunkMetadata;
  relationships?: ChunkRelationships;
  keywords?: Keyword[];
  character_count: number;
  // V2 compatibility
  level?: number;
  title?: string;
  embedded_links?: EmbeddedLink[];
  parent_page_id?: string | null;
}

// V2 Page format (legacy compatibility)
export interface DocumentPage {
  id: string;
  document_id: string;
  parent_page_id: string | null;
  level: number;
  title: string;
  content: string;
  embedded_links: EmbeddedLink[];
  character_count: number;
  position_in_parent: number;
  context: string;
}

export interface DocumentMetadata {
  id: string;
  title: string;
  total_pages?: number; // V2
  total_chunks?: number; // V3
  root_page_id?: string; // V2
  root_chunk_id?: string; // V3
  created_at: string;
  max_depth: number;
  // V3 specific
  original_char_count?: number;
  preserved_char_count?: number;
  coverage_percentage?: number;
}

export interface CoredocDocument {
  document: DocumentMetadata;
  pages?: DocumentPage[]; // V2 compatibility
  chunks?: DocumentChunk[]; // V3 format
}

export interface ProcessingStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  stage: string;
  message?: string;
  error?: string;
  started_at: string;
  completed_at?: string;
}

export interface DocumentUpload {
  file: File;
  title?: string;
  description?: string;
}

export interface DocumentListItem {
  id: string;
  title: string;
  size: number;
  type: string;
  uploaded_at: string;
  status: ProcessingStatus['status'];
  chunk_count: number;
  coverage_percentage?: number;
}

// Navigation types
export interface NavigationHistory {
  chunkId: string;
  title: string;
  timestamp: number;
}

export interface BreadcrumbItem {
  id: string;
  title: string;
  level: number;
}

// Search and filtering
export interface SearchResult {
  chunkId: string;
  title: string;
  content: string;
  relevance: number;
  keywords: string[];
}

export interface FilterOptions {
  level?: number;
  structural_type?: string;
  min_reading_time?: number;
  max_reading_time?: number;
  keywords?: string[];
}

// Statistics and analytics
export interface DocumentStats {
  total_chunks: number;
  total_characters: number;
  avg_chunk_size: number;
  chunks_by_type: Record<string, number>;
  keyword_distribution: Record<string, number>;
  hierarchy_depth: number;
  reading_time_total: number;
  coverage_percentage: number;
}

// UI state types
export interface ViewerState {
  currentChunk: DocumentChunk | null;
  navigationHistory: NavigationHistory[];
  isLoading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  showMetadata: boolean;
}

export interface DocumentStore {
  documents: DocumentListItem[];
  currentDocument: CoredocDocument | null;
  viewerState: ViewerState;
  searchResults: SearchResult[];
  filters: FilterOptions;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DocumentUploadResponse {
  document_id: string;
  processing_id: string;
  message: string;
}

export interface ProcessingResponse {
  status: ProcessingStatus;
  document?: CoredocDocument;
}