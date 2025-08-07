"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface TextProcessorProps {
  onProcess: (text: string) => void;
  isProcessing: boolean;
}

export default function TextProcessor({ onProcess, isProcessing }: TextProcessorProps) {
  const [text, setText] = useState("");
  const minLength = 10000;
  const isValidLength = text.length >= minLength;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidLength && !isProcessing) {
      onProcess(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text (minimum {minLength.toLocaleString()} characters)
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your document content here..."
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          disabled={isProcessing}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm">
            <span className={isValidLength ? "text-green-600" : "text-gray-500"}>
              {text.length.toLocaleString()} / {minLength.toLocaleString()} characters
            </span>
          </div>
          {!isValidLength && text.length > 0 && (
            <div className="flex items-center text-sm text-amber-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              Need {(minLength - text.length).toLocaleString()} more characters
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={!isValidLength || isProcessing}
        className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? "Processing..." : "Generate Coredoc"}
      </button>
    </form>
  );
}