"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, Network, Search } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    id: 1,
    icon: Upload,
    title: "Upload Document",
    description: "Drop your PDF, TXT, or MD file. Support for 100+ page documents.",
    preview: (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="w-24 h-32 bg-muted rounded-lg flex items-center justify-center">
          <Upload className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">research_paper.pdf</p>
      </div>
    ),
  },
  {
    id: 2,
    icon: Cpu,
    title: "AI Processing",
    description: "Advanced algorithms analyze structure and extract key concepts.",
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Cpu className="h-24 w-24 text-primary relative z-10 animate-spin-slow" />
        </div>
      </div>
    ),
  },
  {
    id: 3,
    icon: Network,
    title: "Structure Creation",
    description: "Content is reorganized into interconnected 3K character pages.",
    preview: (
      <div className="grid grid-cols-3 gap-2 p-4">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <div className="p-2 bg-muted rounded-lg">
              <div className="h-1 bg-primary/50 rounded mb-1" />
              <div className="h-1 bg-primary/30 rounded w-4/5" />
            </div>
            {i % 3 !== 2 && (
              <div className="absolute -right-1 top-1/2 w-2 h-0.5 bg-primary/30" />
            )}
            {i < 6 && (
              <div className="absolute -bottom-1 left-1/2 w-0.5 h-2 bg-primary/30" />
            )}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    icon: Search,
    title: "Navigate & Explore",
    description: "Click keywords to dive deeper. Average 3 clicks to any info.",
    preview: (
      <div className="p-6 space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            Machine learning is a subset of{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              artificial intelligence
            </span>{" "}
            that enables systems to learn from{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              data
            </span>
            ...
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-primary/10 rounded-full text-xs">
            Root
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="px-3 py-1 bg-primary/10 rounded-full text-xs">
            ML Basics
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="px-3 py-1 bg-primary rounded-full text-xs text-primary-foreground">
            Current Page
          </div>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-4 mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold">
            How It Works
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Transform your documents in four simple steps
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={fadeUp}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer p-6 rounded-lg border transition-all duration-300 ${
                  activeStep === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-2.5 rounded-lg transition-colors duration-300 ${
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {step.id}. {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-96 bg-background border border-border rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative h-full">
              {steps[activeStep].preview}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}