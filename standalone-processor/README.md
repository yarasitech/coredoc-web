# COREDOC Standalone Processor

Transform your text documents into intelligent, navigable knowledge graphs with the COREDOC algorithm.

## Overview

The COREDOC Standalone Processor is a local tool that converts plain text documents into interconnected knowledge graphs. It automatically:

- Extracts document structure and hierarchy
- Creates optimally-sized chunks (500-2000 characters)
- Identifies important keywords and concepts
- Builds smart cross-references between related sections
- Generates a navigable JSON output

## Requirements

- Python 3.7 or higher
- NLTK library (automatically downloaded on first run)

## Installation

1. Clone or download this folder to your local machine
2. Install the required Python package:

```bash
pip install nltk
```

## Usage

### Processing Documents

1. Place your `.txt` files in the same directory as `process_folder.py`
2. Run the processor:

```bash
python process_folder.py
```

3. The processor will:
   - Scan for all `.txt` files in the current directory
   - Process each file (minimum 1,000 characters)
   - Generate `.coredoc.json` files for each document
   - Create an `index.json` listing all processed documents

### Viewing Documents

1. Open `index.html` in your web browser
2. The viewer will automatically load any processed documents
3. You can also drag-and-drop `.coredoc.json` files directly onto the page

## Features

### Document Processing

- **Hierarchical Structure Detection**: Automatically identifies headings, sections, and subsections
- **Smart Chunking**: Breaks documents into optimal reading sizes while preserving context
- **Keyword Extraction**: Uses natural language processing to identify important terms
- **Automatic Linking**: Creates connections between chunks that share important concepts
- **Multiple File Support**: Process entire folders of documents at once

### Document Viewer

- **Interactive Navigation**: Click keywords to jump between related sections
- **Tree View**: Visualize and navigate document structure
- **Breadcrumb Trail**: Always know where you are in the document
- **Keyboard Navigation**: Use arrow keys to move between chunks
- **Responsive Design**: Works on desktop and mobile devices

## Example Documents

The `examples/` folder contains sample documents to test the processor:

1. Copy a sample to the main directory:
```bash
cp examples/sample1.txt ./my-document.txt
```

2. Run the processor:
```bash
python process_folder.py
```

3. Open `index.html` to view the results

## Output Format

Each processed document creates a `.coredoc.json` file with:

```json
{
  "document": {
    "id": "unique_id",
    "title": "Document Title",
    "total_chunks": 42,
    "root_chunk_id": "chunk_0",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "chunks": [
    {
      "id": "chunk_0",
      "title": "Section Title",
      "content": "Actual content...",
      "summary": "Brief summary...",
      "keywords": [...],
      "embedded_links": [...],
      "relationships": {...}
    }
  ]
}
```

## Tips for Best Results

1. **Document Structure**: Use clear headings (Markdown-style `#` headers work great)
2. **Document Length**: Documents should be at least 1,000 characters
3. **Clear Sections**: Break your content into logical sections
4. **Consistent Terminology**: Use consistent terms for concepts throughout your document

## Troubleshooting

### "No .txt files found"
- Make sure your text files have the `.txt` extension
- Place files in the same directory as `process_folder.py`

### NLTK Download Issues
- The script automatically downloads required NLTK data
- If you have connection issues, you can manually download:
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

### Processing Errors
- Check that your files are valid UTF-8 encoded text
- Ensure documents are at least 1,000 characters long
- Look for error messages in the console output

## Advanced Usage

### Customizing Chunk Sizes

Edit `process_folder.py` to adjust chunk sizes:

```python
processor = CoredocProcessor(min_chunk_size=300, max_chunk_size=1500)
```

### Processing Specific Files

Modify the script to process specific files:

```python
txt_files = ['document1.txt', 'document2.txt']  # Instead of scanning directory
```

## Privacy

All processing happens locally on your machine. Your documents never leave your computer.

## License

This tool is part of the COREDOC project. See the main project repository for license information.

## Support

For issues, questions, or contributions, visit:
- GitHub: https://github.com/yarasitech/coredoc-web
- Discord: https://discord.gg/msVnYXRWAQ