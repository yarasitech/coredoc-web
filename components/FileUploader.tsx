"use client";

import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";

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
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? "border-black bg-gray-50" : "border-gray-300"
        } ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFormats}
          onChange={handleChange}
          disabled={isProcessing}
        />

        {selectedFile ? (
          <div className="space-y-4">
            <File className="w-12 h-12 mx-auto text-gray-600" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isProcessing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="mx-auto flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
                Remove file
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Drop your file here or <span className="font-medium text-black">browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supports: TXT, PDF, DOCX, or JSON (Coredoc)
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedFile && !isProcessing && (
        <button
          onClick={() => onFileSelect(selectedFile)}
          className="mt-4 w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Process Document
        </button>
      )}
    </div>
  );
}