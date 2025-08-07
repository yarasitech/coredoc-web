// API client for Coredoc backend integration

import { CoredocDocument } from '@/types/document';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface UploadResponse {
  document_id: string;
  processing_id: string;
  message: string;
  title: string;
}

export interface ProcessingStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  stage: string;
  message?: string;
  error?: string;
}

export interface Document {
  id: string;
  title: string;
  page_count: number;
  processor: string;
  created_at: string;
  // Optional fields for compatibility
  status?: string;
  chunk_count?: number;
  coverage_percentage?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async uploadDocument(file: File, title?: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) {
      formData.append('title', title);
    }

    const response = await fetch(`${this.baseUrl}/api/v1/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getProcessingStatus(processingId: string): Promise<ProcessingStatus> {
    const response = await fetch(`${this.baseUrl}/api/v1/documents/processing/${processingId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get status: ${response.statusText}`);
    }

    return response.json();
  }

  async getDocuments(): Promise<Document[]> {
    const response = await fetch(`${this.baseUrl}/api/v1/documents`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch documents: ${response.statusText}`);
    }

    const data = await response.json();
    return data.documents || [];
  }

  async getDocument(documentId: string): Promise<CoredocDocument> {
    const response = await fetch(`${this.baseUrl}/api/v1/documents/${documentId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get document: ${response.statusText}`);
    }

    return response.json();
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiClient = new ApiClient();

// Export wrapper functions for compatibility with dashboard
export async function uploadDocument(
  file: File, 
  onProgress?: (progress: number) => void
): Promise<{ id: string }> {
  const result = await apiClient.uploadDocument(file);
  
  // Simulate progress for UI
  if (onProgress) {
    onProgress(50);
    setTimeout(() => onProgress(100), 500);
  }
  
  return { id: result.document_id };
}

export async function checkDocumentStatus(
  documentId: string
): Promise<{ status: ProcessingStatus['status'] }> {
  try {
    const doc = await apiClient.getDocument(documentId);
    // Check if doc has a status field, otherwise assume completed
    return { status: (doc as any).status || 'completed' };
  } catch (error) {
    // If we can't get the document, check processing status
    try {
      const status = await apiClient.getProcessingStatus(documentId);
      return { status: status.status };
    } catch {
      return { status: 'failed' };
    }
  }
}

export async function getDocuments(): Promise<any[]> {
  const docs = await apiClient.getDocuments();
  return docs.map(doc => ({
    ...doc,
    name: doc.title,
    status: (doc as any).status || 'completed',
    created_at: doc.created_at || new Date().toISOString()
  }));
}