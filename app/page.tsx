"use client";

import { useState } from "react";
import VideoDemo from "@/components/VideoDemo";
import TextProcessor from "@/components/TextProcessor";
import FileUploader from "@/components/FileUploader";
import DocumentViewer from "@/components/document/DocumentViewer";
import { Download, FileText, Upload } from "lucide-react";
import { CoredocDocument } from "@/types/document";
import styles from "./page.module.css";

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
      <div className={styles.viewerContainer}>
        <div className={styles.viewerHeader}>
          <div className={styles.viewerHeaderContent}>
            <button
              onClick={() => setGeneratedDoc(null)}
              className={styles.backButton}
            >
              ← Back to Generator
            </button>
            <button
              onClick={downloadCoredoc}
              className={styles.downloadButton}
            >
              <Download />
              Download Coredoc
            </button>
          </div>
        </div>
        <div className={styles.viewerContent}>
          <DocumentViewer document={generatedDoc} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Coredoc Demo</h1>
          <p className={styles.headerSubtitle}>
            Transform any document into navigable knowledge graphs
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {/* Video Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>See Coredoc in Action</h2>
            <p className={styles.sectionSubtitle}>
              Watch how Coredoc transforms linear documents into interconnected pages
            </p>
          </div>
          <VideoDemo />
        </section>

        {/* Try It Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Try It Yourself</h2>
            <p className={styles.sectionSubtitle}>
              Process your own documents or upload existing Coredoc files
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabContainer}>
            <div className={styles.tabGroup}>
              <button
                onClick={() => setActiveTab("text")}
                className={`${styles.tabButton} ${
                  activeTab === "text"
                    ? styles.tabButtonActive
                    : styles.tabButtonInactive
                }`}
              >
                <FileText />
                Text Input
              </button>
              <button
                onClick={() => setActiveTab("file")}
                className={`${styles.tabButton} ${
                  activeTab === "file"
                    ? styles.tabButtonActive
                    : styles.tabButtonInactive
                }`}
              >
                <Upload />
                File Upload
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {error && (
              <div className={styles.errorMessage}>
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
        <section className={styles.section}>
          <div className={styles.instructionsCard}>
            <h2 className={styles.instructionsTitle}>Run Locally</h2>
            <div className={styles.instructionsContent}>
              <div className={styles.instructionsSection}>
                <h3 className={styles.instructionsSectionTitle}>Quick Start</h3>
                <ol className={`${styles.instructionsList} ${styles.orderedList}`}>
                  <li>Clone the repository</li>
                  <li>Install dependencies: <code className={styles.codeSnippet}>npm install</code></li>
                  <li>Set up Python environment (see README)</li>
                  <li>Run the development server: <code className={styles.codeSnippet}>npm run dev</code></li>
                </ol>
              </div>
              <div className={styles.instructionsSection}>
                <h3 className={styles.instructionsSectionTitle}>Features</h3>
                <ul className={`${styles.instructionsList} ${styles.unorderedList}`}>
                  <li>Process text documents (10,000+ characters)</li>
                  <li>Upload TXT, PDF, or DOCX files</li>
                  <li>View existing Coredoc JSON files</li>
                  <li>Navigate through interconnected pages</li>
                  <li>Download generated Coredoc files</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}