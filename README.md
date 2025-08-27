# Coredoc Web Demo

A local demo application that showcases the Coredoc principle - transforming linear documents into navigable knowledge graphs.

## What is Coredoc?

Coredoc is an algorithm that:
- Breaks down long documents into hierarchical, interconnected chunks
- Identifies relationships between different parts of the document
- Creates navigable links between related concepts
- Preserves document structure while enabling non-linear exploration

## Features

- 📝 **Text Processing**: Input text directly (minimum 10,000 characters)
- 📄 **File Upload**: Process TXT files (PDF/DOCX support coming soon)
- 🔍 **Document Viewer**: Navigate through interconnected document chunks
- 💾 **Export/Import**: Save and load Coredoc JSON files
- 🚀 **Local Processing**: Everything runs on your machine

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yarasitech/coredoc-web.git
cd coredoc-web
```

2. Install Node dependencies:
```bash
npm install
```

3. Set up Python environment:
```bash
cd coredoc-processor
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Processing Text

1. Click on "Text Input" tab
2. Paste or type your document (minimum 10,000 characters)
3. Click "Generate Coredoc"
4. Navigate through the generated document structure

### Uploading Files

1. Click on "File Upload" tab
2. Drag and drop or select a TXT file
3. Click "Process Document"
4. Explore the hierarchical document view

### Viewing Coredoc Files

- Upload existing `.json` Coredoc files to view them
- Download generated Coredoc files for sharing or later viewing

## How It Works

The Coredoc algorithm:

1. **Section Detection**: Identifies document structure using heading patterns
2. **Chunk Creation**: Splits content into optimal reading sizes (500-2000 characters)
3. **Keyword Extraction**: Finds important terms and concepts
4. **Link Generation**: Creates connections between related chunks
5. **Hierarchy Building**: Organizes chunks into a navigable tree structure

## Development

### Project Structure

```
coredoc-web/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main demo page
│   └── api/process/       # Processing endpoint
├── components/            # React components
│   ├── DocumentViewer.tsx # Document navigation UI
│   ├── TextProcessor.tsx  # Text input component
│   └── FileUploader.tsx   # File upload component
├── coredoc-processor/     # Python processing engine
│   └── coredoc.py        # Core algorithm
└── types/                # TypeScript definitions
```

### Running Tests

```bash
# Run Python tests
cd coredoc-processor
python -m pytest

# Run TypeScript tests (coming soon)
npm test
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details

## Roadmap

- [ ] PDF file support
- [ ] DOCX file support
- [ ] Enhanced keyword extraction
- [ ] Multi-language support
- [ ] Export to other formats (Markdown, HTML)
- [ ] Cloud processing option
- [ ] Collaborative features

## Privacy & Cookie Consent

### Overview
This website implements a comprehensive cookie consent management system to ensure GDPR compliance. The system is designed to meet Microsoft Clarity's requirements and must be fully compliant by October 31st, 2025.

### Features
- **Automatic EU Detection**: Detects users from EU/UK/Switzerland using timezone-based geolocation
- **Granular Consent Management**: Users can control analytics and marketing cookies separately
- **Microsoft Clarity Integration**: Analytics only loads after explicit user consent
- **Privacy-First Design**: Non-EU users are auto-consented to analytics only (not marketing)
- **Persistent Preferences**: Cookie choices are remembered for 365 days

### Testing Cookie Consent
To test the cookie consent banner as an EU user:
```javascript
// In browser console
localStorage.setItem('coredoc_simulate_eu', 'true');
// Then refresh the page
```

### Cookie Types
- **Necessary Cookies**: Essential for website functionality (always enabled)
  - `coredoc_cookie_consent`: Stores consent preferences
- **Analytics Cookies**: Microsoft Clarity for session recordings and heatmaps (requires consent)
  - Project ID: `srt9q71p7f`
- **Marketing Cookies**: Currently not used

### Privacy Pages
- Privacy Policy: `/privacy`
- Cookie Policy: `/cookies`

### Implementation Details
- Consent management in `/lib/consent/consent-manager.ts`
- Cookie consent components in `/components/CookieConsent/`
- Updated Clarity component to check consent before loading
- CSS modules used for consistent styling

## Support

For issues and questions:
- Create an issue on [GitHub](https://github.com/yarasitech/coredoc-web/issues)
- Join our [Discord](https://discord.gg/msVnYXRWAQ)

---

Built with ❤️ by the Coredoc team