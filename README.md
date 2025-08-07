# Coredoc Landing Page

The official landing page for Coredoc - an open-source protocol that transforms linear documents into infinite knowledge graphs.

## Overview

This is a Next.js 14 application built with TypeScript, Tailwind CSS, and Framer Motion. It serves as the main marketing website for the Coredoc project, showcasing its features and encouraging developer contributions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (headlines), System fonts (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yarasitech/coredoc-web.git
cd coredoc-web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Project Structure

```
coredoc-web/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles and CSS variables
├── components/
│   ├── Navigation.tsx  # Sticky header navigation
│   ├── Hero.tsx        # Hero section with CTAs
│   ├── ProblemSolution.tsx # Problem/solution comparison
│   ├── HowItWorks.tsx  # Interactive process flow
│   ├── TechnicalFeatures.tsx # Developer features
│   ├── OpenSourceCTA.tsx # Contribution call-to-action
│   └── Footer.tsx      # Site footer
├── lib/
│   └── animations.ts   # Framer Motion animation variants
└── public/
    └── images/         # Static assets
```

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Performance Optimized**: Lazy loading, image optimization, and minimal bundle size
- **SEO Friendly**: Proper meta tags, Open Graph, and Twitter cards
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Run linting
npm run lint
```

## Deployment

The site is optimized for deployment on Vercel, Netlify, or any static hosting platform.

```bash
# Build static export
npm run build

# The output will be in the `out` directory
```

## Contributing

We welcome contributions! Please see the main [Coredoc repository](https://github.com/yarasitech/coredoc) for contribution guidelines.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Main Coredoc Repository](https://github.com/yarasitech/coredoc)
- [Documentation](https://docs.coredoc.dev)
- [Demo](https://demo.coredoc.dev)
- [Discord Community](https://discord.gg/coredoc)
