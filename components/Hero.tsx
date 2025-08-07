"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, FileCode, Zap } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-block">
            <div className="flex items-center space-x-3 px-5 py-2.5 bg-muted rounded-full text-sm">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">
                Open Source • MIT Licensed • Community Driven
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Transform Linear Documents
            <br />
            into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Infinite Knowledge Graphs
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-3xl mx-auto text-xl text-muted-foreground"
          >
            An open-source protocol that revolutionizes how humans and AI navigate
            information through context-first document architecture. Break free from
            linear constraints with the 3K Rule.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="https://demo.coredoc.dev"
              className="group flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
            >
              <span className="text-lg font-medium">View Live Demo</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://github.com/yarasitech/coredoc"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-background border-2 border-border rounded-lg hover:border-primary transition-all duration-200"
            >
              <Github className="h-5 w-5" />
              <span className="text-lg font-medium">Star on GitHub</span>
              <span className="ml-2 px-3 py-0.5 bg-muted text-sm rounded-md">2.3k</span>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            <div className="p-5 bg-background/50 backdrop-blur-sm border border-border rounded-lg">
              <FileCode className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">100% Content Preserved</h3>
              <p className="text-muted-foreground">
                Every word matters. Our semantic chunking ensures no information is lost.
              </p>
            </div>
            <div className="p-5 bg-background/50 backdrop-blur-sm border border-border rounded-lg">
              <Zap className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Process 100-page documents in under 30 seconds. Navigate instantly.
              </p>
            </div>
            <div className="p-5 bg-background/50 backdrop-blur-sm border border-border rounded-lg">
              <Github className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">Open Source</h3>
              <p className="text-muted-foreground">
                MIT licensed. Built by developers, for developers. Join us!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-96 h-96 -z-10"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-accent/20 blur-3xl rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}