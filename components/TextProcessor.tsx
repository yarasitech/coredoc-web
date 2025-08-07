"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import styles from "./TextProcessor.module.css";

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="text-input" className={styles.label}>
          Enter your text (minimum {minLength.toLocaleString()} characters)
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your document content here..."
          className={styles.textarea}
          disabled={isProcessing}
        />
        <div className={styles.metaInfo}>
          <div>
            <span className={isValidLength ? styles.charCountValid : styles.charCount}>
              {text.length.toLocaleString()} / {minLength.toLocaleString()} characters
            </span>
          </div>
          {!isValidLength && text.length > 0 && (
            <div className={styles.warningMessage}>
              <AlertCircle className={styles.warningIcon} />
              Need {(minLength - text.length).toLocaleString()} more characters
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={!isValidLength || isProcessing}
        className={`${styles.submitButton} ${isProcessing ? styles.processing : ""}`}
      >
        {isProcessing ? "Processing..." : "Generate Coredoc"}
      </button>
    </form>
  );
}