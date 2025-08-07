"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, FileText, Clock, CheckCircle, XCircle, LogOut } from "lucide-react";
import { uploadDocument, checkDocumentStatus, getDocuments } from "@/lib/api";
import type { ProcessingStatus } from "@/types/document";

interface Document {
  id: string;
  name: string;
  created_at: string;
  status: ProcessingStatus['status'];
}

export default function DashboardPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingDocId, setProcessingDocId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    if (processingDocId) {
      const interval = setInterval(async () => {
        try {
          const status = await checkDocumentStatus(processingDocId);
          if (status.status === "completed" || status.status === "failed") {
            setProcessingDocId(null);
            loadDocuments();
          }
        } catch (error) {
          console.error("Error checking status:", error);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [processingDocId]);

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadDocument(file, (progress) => {
        setUploadProgress(progress);
      });

      setProcessingDocId(result.id);
      setUploadProgress(100);
      
      // Reset after a short delay
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getStatusIcon = (status: ProcessingStatus) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleLogout = () => {
    // TODO: Implement actual logout
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Documents</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
          
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.txt,.docx,.md"
              disabled={uploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                uploading
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {uploading ? "Uploading..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, TXT, DOCX, MD up to 10MB</p>
            </label>

            {uploading && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Documents</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {documents.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No documents yet. Upload your first document to get started.
              </div>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className="text-sm text-gray-600 capitalize">{doc.status}</span>
                    </div>
                    
                    {doc.status === "completed" && (
                      <Link
                        href={`/app/viewer/${doc.id}`}
                        className="text-sm font-medium text-black hover:underline"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}