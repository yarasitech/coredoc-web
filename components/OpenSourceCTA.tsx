"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Star, GitFork, Users, Code, MessageSquare } from "lucide-react";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/animations";

const contributionAreas = [
  {
    icon: Code,
    title: "Core Protocol",
    description: "Improve document processing algorithms and performance",
  },
  {
    icon: GitFork,
    title: "UI/UX",
    description: "Enhance the viewer experience and navigation patterns",
  },
  {
    icon: MessageSquare,
    title: "Language Support",
    description: "Add support for more languages and document formats",
  },
];

export default function OpenSourceCTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h2 className="text-4xl font-bold">Join the Revolution</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Coredoc is open source and community-driven. Help us build the future
              of document navigation.
            </p>
          </motion.div>

          {/* GitHub Stats */}
          <motion.div
            variants={scaleIn}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">2.3k Stars</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
              <GitFork className="h-5 w-5 text-primary" />
              <span className="font-semibold">342 Forks</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold">58 Contributors</span>
            </div>
          </motion.div>

          {/* Contribution Areas */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {contributionAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="p-6 bg-background border border-border rounded-lg hover:border-primary transition-colors duration-300"
              >
                <area.icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                <p className="text-muted-foreground">{area.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Start Code */}
          <motion.div
            variants={fadeUp}
            className="max-w-3xl mx-auto bg-background border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
            <pre className="text-sm overflow-x-auto text-left">
              <code className="language-bash">{`# Clone the repository
git clone https://github.com/yarasitech/coredoc.git
cd coredoc

# Install dependencies
npm install

# Run the development server
npm run dev

# Start contributing! 🚀`}</code>
            </pre>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="https://github.com/yarasitech/coredoc"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
            >
              <Github className="h-5 w-5" />
              <span className="text-lg font-medium">View on GitHub</span>
            </Link>
            <Link
              href="https://discord.gg/coredoc"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-8 py-4 bg-background border-2 border-border rounded-lg hover:border-primary transition-all duration-200"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-lg font-medium">Join Discord</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}