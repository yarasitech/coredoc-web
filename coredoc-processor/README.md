# Coredoc Processor

Python implementation of the Coredoc algorithm for transforming linear documents into hierarchical, interconnected knowledge graphs.

## Setup

1. Create a Python virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Download NLTK data (will happen automatically on first run):
```python
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

## Usage

### Command Line

Process a text file:
```bash
python coredoc.py input.txt -o output.json -t "My Document Title"
```

### Python API

```python
from coredoc import CoredocProcessor

processor = CoredocProcessor()
document = processor.process_text(text, title="My Document")
```

## Algorithm Overview

The Coredoc processor performs the following steps:

1. **Text Cleaning**: Normalizes whitespace and formatting
2. **Section Extraction**: Identifies hierarchical structure using heading patterns
3. **Chunk Creation**: Splits content into appropriately sized chunks (500-2000 chars)
4. **Keyword Extraction**: Identifies important terms and phrases
5. **Link Generation**: Creates connections between related chunks
6. **Structure Building**: Assembles the final document with metadata

## Output Format

The processor generates a JSON document with:
- Document metadata (title, chunk count, creation date)
- Hierarchical chunk structure
- Embedded links between related content
- Keywords and summaries for each chunk

## Integration with Web App

The web app's API endpoint at `/api/process` executes this script to process uploaded documents.