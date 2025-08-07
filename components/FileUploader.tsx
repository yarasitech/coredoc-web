"use client";

import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import styles from "./FileUploader.module.css";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  onCoredocUpload: (content: string) => void;
  isProcessing: boolean;
}

export default function FileUploader({ onFileSelect, onCoredocUpload, isProcessing }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    
    // Check if it's a JSON file (potential coredoc)
    if (file.type === "application/json" || file.name.endsWith(".json")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const content = e.target.result as string;
            const parsed = JSON.parse(content);
            // Check if it has coredoc structure
            if (parsed.document && (parsed.chunks || parsed.pages)) {
              onCoredocUpload(content);
              return;
            }
          } catch (error) {
            console.error("Invalid JSON file");
          }
        }
      };
      reader.readAsText(file);
    } else {
      onFileSelect(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const acceptedFormats = ".txt,.pdf,.docx,.doc,.json";

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropZone} ${
          dragActive ? styles.dropZoneActive : ""
        } ${isProcessing ? styles.dropZoneDisabled : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className={styles.hiddenInput}
          accept={acceptedFormats}
          onChange={handleChange}
          disabled={isProcessing}
        />

        {selectedFile ? (
          <div className={styles.content}>
            <File className={`${styles.icon} ${styles.selectedFileIcon}`} />
            <div className={styles.textContent}>
              <p className={styles.fileName}>{selectedFile.name}</p>
              <p className={styles.fileSize}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isProcessing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className={styles.removeButton}
              >
                <X className={styles.removeIcon} />
                Remove file
              </button>
            )}
          </div>
        ) : (
          <div className={styles.content}>
            <Upload className={styles.icon} />
            <div className={styles.textContent}>
              <p className={styles.uploadText}>
                Drop your file here or <span className={styles.browseText}>browse</span>
              </p>
              <p className={styles.supportedFormats}>
                Supports: TXT, PDF, DOCX, or JSON (Coredoc)
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedFile && !isProcessing && (
        <button
          onClick={() => onFileSelect(selectedFile)}
          className={styles.processButton}
        >
          Process Document
        </button>
      )}
    </div>
  );
}