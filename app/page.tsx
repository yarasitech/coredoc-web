"use client";

import { useState } from "react";
import VideoDemo from "@/components/VideoDemo";
import TextProcessor from "@/components/TextProcessor";
import FileUploader from "@/components/FileUploader";
import DocumentViewer from "@/components/document/DocumentViewer";
import { Download, FileText, Upload } from "lucide-react";
import { CoredocDocument } from "@/types/document";

type TabType = "text" | "file";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("text");
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<CoredocDocument | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTextProcess = async (text: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type: "text" }),
      });

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const result = await response.json();
      setGeneratedDoc(result.document);
    } catch (err) {
      setError("Failed to process document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileProcess = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const result = await response.json();
      setGeneratedDoc(result.document);
    } catch (err) {
      setError("Failed to process file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCoredocUpload = (content: string) => {
    try {
      const doc = JSON.parse(content) as CoredocDocument;
      setGeneratedDoc(doc);
      setError(null);
    } catch (err) {
      setError("Invalid Coredoc file format");
    }
  };

  const downloadCoredoc = () => {
    if (!generatedDoc) return;

    const blob = new Blob([JSON.stringify(generatedDoc, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coredoc-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (generatedDoc) {
    return (
      <div className="h-screen flex flex-col">
        <div className="border-b border-gray-200 bg-white px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setGeneratedDoc(null)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Generator
            </button>
            <button
              onClick={downloadCoredoc}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Coredoc
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <DocumentViewer document={generatedDoc} className="h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Coredoc Demo</h1>
          <p className="mt-2 text-gray-600">
            Transform any document into navigable knowledge graphs
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Video Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">See Coredoc in Action</h2>
            <p className="mt-2 text-gray-600">
              Watch how Coredoc transforms linear documents into interconnected pages
            </p>
          </div>
          <VideoDemo />
        </section>

        {/* Try It Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Try It Yourself</h2>
            <p className="mt-2 text-gray-600">
              Process your own documents or upload existing Coredoc files
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setActiveTab("text")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "text"
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Text Input
              </button>
              <button
                onClick={() => setActiveTab("file")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "file"
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                File Upload
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-2xl mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {activeTab === "text" ? (
              <TextProcessor onProcess={handleTextProcess} isProcessing={isProcessing} />
            ) : (
              <FileUploader
                onFileSelect={handleFileProcess}
                onCoredocUpload={handleCoredocUpload}
                isProcessing={isProcessing}
              />
            )}
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold mb-4">Run Locally</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Start</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Clone the repository</li>
                <li>Install dependencies: <code className="bg-gray-100 px-2 py-1 rounded">npm install</code></li>
                <li>Set up Python environment (see README)</li>
                <li>Run the development server: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Process text documents (10,000+ characters)</li>
                <li>Upload TXT, PDF, or DOCX files</li>
                <li>View existing Coredoc JSON files</li>
                <li>Navigate through interconnected pages</li>
                <li>Download generated Coredoc files</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}