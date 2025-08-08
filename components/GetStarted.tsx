"use client";

import { useState } from "react";
import styles from "./GetStarted.module.css";

export default function GetStarted() {
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState<'docker' | 'manual'>('docker');

  return (
    <div className={styles.container}>
      <button 
        className={styles.getStartedButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Get Started
      </button>
      
      {isOpen && (
        <div className={styles.instructions}>
          <h2 className={styles.instructionsTitle}>Run COREDOC Locally</h2>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Clone the Repository</h3>
              <code className={styles.code}>
                git clone https://github.com/yarasitech/coredoc-web.git<br />
                cd coredoc-web
              </code>
            </div>
          </div>

          <div className={styles.methodChoice}>
            <h3>Choose Your Setup Method:</h3>
            <div className={styles.methodTabs}>
              <button className={styles.methodTab} onClick={() => setMethod('docker')} data-active={method === 'docker'}>
                🐳 Docker (Recommended)
              </button>
              <button className={styles.methodTab} onClick={() => setMethod('manual')} data-active={method === 'manual'}>
                🔧 Manual Setup
              </button>
            </div>
          </div>

          {method === 'docker' ? (
            <>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Run with Docker</h3>
                  <code className={styles.code}>
                    docker-compose up
                  </code>
                  <p className={styles.note}>No Python or NLTK installation needed!</p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Add Your Documents</h3>
                  <p>Place your .txt files in <code>standalone-processor/documents/</code></p>
                  <p className={styles.note}>Documents should be at least 1,000 characters</p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>View Results</h3>
                  <p>Open <a href="http://localhost:8000" target="_blank" rel="noopener noreferrer">http://localhost:8000</a> in your browser</p>
                  <p className={styles.note}>The viewer opens automatically after processing</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Install Dependencies</h3>
                  <code className={styles.code}>
                    npm install<br />
                    pip install nltk
                  </code>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Add Your Documents</h3>
                  <p>Place your .txt files in the <code>standalone-processor/</code> folder</p>
                  <p className={styles.note}>Documents should be at least 1,000 characters</p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Process Documents</h3>
                  <code className={styles.code}>npm run coredoc</code>
                  <p className={styles.note}>This will process all .txt files and open the viewer in your browser</p>
                </div>
              </div>
            </>
          )}

          <div className={styles.features}>
            <h3>What You Get:</h3>
            <ul>
              <li>✓ Automatic document chunking (500-2000 chars)</li>
              <li>✓ Smart keyword extraction and linking</li>
              <li>✓ Interactive web viewer with navigation</li>
              <li>✓ Export to JSON for API integration</li>
              <li>✓ 100% local processing - your data stays private</li>
            </ul>
          </div>

          <div className={styles.links}>
            <a href="https://github.com/yarasitech/coredoc-web/tree/main/standalone-processor" target="_blank" rel="noopener noreferrer">
              View Documentation →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}