"use client";

import { motion } from "framer-motion";
import { FileX2, CheckCircle, ArrowRight } from "lucide-react";
import { fadeUp, slideInFromLeft, slideInFromRight } from "@/lib/animations";

export default function ProblemSolution() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInFromLeft}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <FileX2 className="h-8 w-8 text-red-500" />
              <h2 className="text-3xl font-bold">The Problem</h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              Traditional documents trap knowledge in linear formats
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-muted-foreground">
                  Endless scrolling through 100+ page PDFs to find specific information
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-muted-foreground">
                  Context lost when jumping between sections
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-muted-foreground">
                  LLMs struggle with large documents due to context window limitations
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-muted-foreground">
                  No semantic relationships between related concepts
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInFromRight}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold">The Solution</h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Coredoc breaks documents into intelligent, interconnected fragments
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <span className="text-accent mt-1">✓</span>
                <span>
                  <strong>3K Rule:</strong> Every page contains exactly 3,000 characters
                  or less for optimal comprehension
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-accent mt-1">✓</span>
                <span>
                  <strong>Instant Navigation:</strong> Click any keyword to explore
                  related concepts in depth
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-accent mt-1">✓</span>
                <span>
                  <strong>Perfect for RAG:</strong> Pre-structured chunks ideal for
                  retrieval-augmented generation
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-accent mt-1">✓</span>
                <span>
                  <strong>Context Preserved:</strong> Breadcrumbs and navigation trees
                  maintain your reading flow
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Visual Comparison */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          {/* Before */}
          <div className="relative p-8 bg-background border border-border rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <h4 className="text-lg font-semibold mb-4">Traditional Document</h4>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-4/5" />
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-3/4" />
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-5/6" />
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-2/3" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Linear, overwhelming, hard to navigate
            </p>
          </div>

          {/* After */}
          <div className="relative p-8 bg-background border border-border rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <h4 className="text-lg font-semibold mb-4">Coredoc Document</h4>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="relative p-2 bg-muted rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <div className="h-1 bg-primary/50 rounded mb-1" />
                  <div className="h-1 bg-primary/30 rounded w-4/5" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Structured, navigable, context-aware
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}