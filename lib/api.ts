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