"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Gauge, Lock, Globe, Puzzle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const aiFeatures = [
  {
    icon: Brain,
    title: "Pre-structured Context Windows",
    description: "Every page is optimized for LLM consumption with clear boundaries",
  },
  {
    icon: Puzzle,
    title: "Semantic Relationships Preserved",
    description: "Parent-child and cross-reference links maintain document coherence",
  },
  {
    icon: Lock,
    title: "100% Content Preservation",
    description: "TF-IDF keyword extraction ensures no information is lost",
  },
];

const devFeatures = [
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description: "Next.js 14, FastAPI, PostgreSQL with JSONB for flexible storage",
  },
  {
    icon: Globe,
    title: "RESTful API",
    description: "Easy integration with comprehensive OpenAPI documentation",
  },
  {
    icon: Gauge,
    title: "Lightning Performance",
    description: "Sub-30s processing, <100ms navigation, <$0.50 per document",
  },
];

export default function TechnicalFeatures() {
  return (
    <section id="for-developers" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold">
            Built for Developers
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Whether you're building AI applications or full-stack solutions,
            Coredoc has you covered
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For AI/LLM Developers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-bold flex items-center space-x-2"
            >
              <Brain className="h-8 w-8 text-primary" />
              <span>For AI/LLM Developers</span>
            </motion.h3>
            <motion.p variants={fadeUp} className="text-muted-foreground">
              Perfect for RAG architectures and semantic search applications
            </motion.p>
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={fadeUp}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <pre className="text-sm overflow-x-auto">
                <code className="language-python">{`# Example: Using Coredoc with LangChain
from langchain.vectorstores import Coredoc
from langchain.chains import RetrievalQA

# Load pre-processed document
doc = Coredoc.load("research_paper.json")

# Create retrieval chain
qa_chain = RetrievalQA.from_coredoc(
    document=doc,
    chunk_size=3000  # Already optimized!
)`}</code>
              </pre>
            </motion.div>
          </motion.div>

          {/* For Full-Stack Developers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-bold flex items-center space-x-2"
            >
              <Code2 className="h-8 w-8 text-accent" />
              <span>For Full-Stack Developers</span>
            </motion.h3>
            <motion.p variants={fadeUp} className="text-muted-foreground">
              Production-ready infrastructure with modern tooling
            </motion.p>
            <div className="space-y-4">
              {devFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border"
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={fadeUp}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <pre className="text-sm overflow-x-auto">
                <code className="language-typescript">{`// Example: Integrating Coredoc API
const response = await fetch('/api/documents', {
  method: 'POST',
  body: formData
});

const { documentId } = await response.json();

// Navigate to processed document
window.location.href = \`/viewer/\${documentId}\`;`}</code>
              </pre>
            </motion.div>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="text-3xl font-bold text-primary mb-2">&lt;30s</div>
            <p className="text-sm text-muted-foreground">Processing Time</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="text-3xl font-bold text-accent mb-2">&lt;100ms</div>
            <p className="text-sm text-muted-foreground">Navigation Speed</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">Content Preserved</p>
          </div>
          <div className="text-center p-6 bg-background rounded-lg border border-border">
            <div className="text-3xl font-bold text-accent mb-2">&lt;$0.50</div>
            <p className="text-sm text-muted-foreground">Per Document</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}