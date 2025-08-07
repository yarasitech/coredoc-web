#!/usr/bin/env python3
"""
Coredoc Document Processor

This script implements the Coredoc algorithm to transform linear documents
into hierarchical, interconnected knowledge graphs.
"""

import json
import re
import hashlib
from typing import List, Dict, Tuple, Optional, Set
from collections import defaultdict
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import argparse

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')


class CoredocProcessor:
    def __init__(self, min_chunk_size: int = 500, max_chunk_size: int = 2000):
        self.min_chunk_size = min_chunk_size
        self.max_chunk_size = max_chunk_size
        self.stop_words = set(stopwords.words('english'))
        
    def process_text(self, text: str, title: str = "Untitled Document") -> Dict:
        """Process text into a Coredoc format"""
        # Clean and preprocess text
        text = self._clean_text(text)
        
        # Extract hierarchical structure
        sections = self._extract_sections(text)
        
        # Create chunks from sections
        chunks = self._create_chunks(sections)
        
        # Extract keywords and create links
        chunks = self._extract_keywords_and_links(chunks)
        
        # Build document structure
        document = self._build_document_structure(chunks, title)
        
        return document
    
    def _clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()
    
    def _extract_sections(self, text: str) -> List[Dict]:
        """Extract hierarchical sections from text"""
        sections = []
        
        # Common heading patterns
        heading_patterns = [
            (r'^#{1,6}\s+(.+)$', 'markdown'),
            (r'^([A-Z][A-Z\s]+)$', 'caps'),
            (r'^(\d+\.?\s+.+)$', 'numbered'),
            (r'^([IVX]+\.\s+.+)$', 'roman'),
        ]
        
        lines = text.split('\n')
        current_section = {
            'title': 'Introduction',
            'content': [],
            'level': 0,
            'children': []
        }
        
        for i, line in enumerate(lines):
            is_heading = False
            
            for pattern, style in heading_patterns:
                match = re.match(pattern, line.strip())
                if match:
                    # Save current section if it has content
                    if current_section['content']:
                        sections.append(current_section)
                    
                    # Determine level based on style
                    level = self._determine_heading_level(line, style)
                    
                    current_section = {
                        'title': match.group(1).strip(),
                        'content': [],
                        'level': level,
                        'children': []
                    }
                    is_heading = True
                    break
            
            if not is_heading and line.strip():
                current_section['content'].append(line)
        
        # Add last section
        if current_section['content']:
            sections.append(current_section)
        
        # If no sections found, create one from the entire text
        if not sections:
            sections = [{
                'title': 'Main Content',
                'content': lines,
                'level': 0,
                'children': []
            }]
        
        return self._build_hierarchy(sections)
    
    def _determine_heading_level(self, line: str, style: str) -> int:
        """Determine heading level based on style"""
        if style == 'markdown':
            return line.count('#') - 1
        elif style == 'caps':
            return 1
        elif style == 'numbered':
            # Count dots or indentation
            dots = line.count('.')
            return min(dots, 3)
        elif style == 'roman':
            return 2
        return 0
    
    def _build_hierarchy(self, sections: List[Dict]) -> List[Dict]:
        """Build hierarchical structure from flat sections"""
        if not sections:
            return []
        
        root_sections = []
        stack = []
        
        for section in sections:
            # Find parent
            while stack and stack[-1]['level'] >= section['level']:
                stack.pop()
            
            if stack:
                # Add as child to parent
                stack[-1]['children'].append(section)
            else:
                # Add as root section
                root_sections.append(section)
            
            stack.append(section)
        
        return root_sections
    
    def _create_chunks(self, sections: List[Dict]) -> List[Dict]:
        """Create chunks from sections"""
        chunks = []
        chunk_id = 0
        
        def process_section(section: Dict, parent_id: Optional[str] = None, level: int = 0):
            nonlocal chunk_id
            
            content = '\n'.join(section['content'])
            
            # Split large sections into smaller chunks
            if len(content) > self.max_chunk_size:
                sub_chunks = self._split_into_chunks(content)
                
                for i, sub_content in enumerate(sub_chunks):
                    chunk = {
                        'id': f'chunk_{chunk_id}',
                        'title': f"{section['title']} (Part {i+1})" if len(sub_chunks) > 1 else section['title'],
                        'content': sub_content,
                        'level': level,
                        'parent_id': parent_id,
                        'character_count': len(sub_content),
                        'keywords': [],
                        'embedded_links': []
                    }
                    chunks.append(chunk)
                    
                    if i == 0:
                        first_chunk_id = chunk['id']
                    
                    chunk_id += 1
                
                parent_id = first_chunk_id
            else:
                chunk = {
                    'id': f'chunk_{chunk_id}',
                    'title': section['title'],
                    'content': content,
                    'level': level,
                    'parent_id': parent_id,
                    'character_count': len(content),
                    'keywords': [],
                    'embedded_links': []
                }
                chunks.append(chunk)
                parent_id = chunk['id']
                chunk_id += 1
            
            # Process children
            for child in section['children']:
                process_section(child, parent_id, level + 1)
        
        # Process all root sections
        for section in sections:
            process_section(section)
        
        return chunks
    
    def _split_into_chunks(self, text: str) -> List[str]:
        """Split text into chunks of appropriate size"""
        sentences = sent_tokenize(text)
        chunks = []
        current_chunk = []
        current_size = 0
        
        for sentence in sentences:
            sentence_size = len(sentence)
            
            if current_size + sentence_size > self.max_chunk_size and current_chunk:
                chunks.append(' '.join(current_chunk))
                current_chunk = [sentence]
                current_size = sentence_size
            else:
                current_chunk.append(sentence)
                current_size += sentence_size
        
        if current_chunk:
            chunks.append(' '.join(current_chunk))
        
        return chunks
    
    def _extract_keywords_and_links(self, chunks: List[Dict]) -> List[Dict]:
        """Extract keywords and create embedded links between chunks"""
        # Extract keywords from each chunk
        chunk_keywords = {}
        
        for chunk in chunks:
            keywords = self._extract_keywords(chunk['content'])
            chunk['keywords'] = keywords
            chunk_keywords[chunk['id']] = set(kw['term'] for kw in keywords)
        
        # Create links between chunks based on keyword overlap
        for i, chunk in enumerate(chunks):
            links = []
            chunk_terms = chunk_keywords[chunk['id']]
            
            for j, other_chunk in enumerate(chunks):
                if i == j:
                    continue
                
                other_terms = chunk_keywords[other_chunk['id']]
                common_terms = chunk_terms.intersection(other_terms)
                
                if common_terms:
                    # Find the most important common term
                    best_term = max(common_terms, key=lambda t: 
                        next(kw['importance_score'] for kw in chunk['keywords'] if kw['term'] == t))
                    
                    # Check if this term appears in the current chunk's content
                    if re.search(r'\b' + re.escape(best_term) + r'\b', chunk['content'], re.IGNORECASE):
                        links.append({
                            'keyword': best_term,
                            'target_page_id': other_chunk['id'],
                            'context_hint': f"Related content about {best_term}"
                        })
            
            # Limit links per chunk
            chunk['embedded_links'] = sorted(links, 
                key=lambda l: len(l['keyword']), reverse=True)[:5]
        
        return chunks
    
    def _extract_keywords(self, text: str) -> List[Dict]:
        """Extract keywords from text"""
        # Tokenize and filter
        words = word_tokenize(text.lower())
        words = [w for w in words if w.isalnum() and w not in self.stop_words and len(w) > 3]
        
        # Count frequency
        word_freq = defaultdict(int)
        for word in words:
            word_freq[word] += 1
        
        # Extract noun phrases (simple approach)
        noun_phrases = self._extract_noun_phrases(text)
        
        # Combine and score
        keywords = []
        
        # Add single words
        for word, freq in word_freq.items():
            if freq > 1:  # Appears more than once
                keywords.append({
                    'term': word,
                    'importance_score': freq / len(words),
                    'positions': [i for i, w in enumerate(words) if w == word]
                })
        
        # Add noun phrases
        for phrase in noun_phrases:
            phrase_lower = phrase.lower()
            count = text.lower().count(phrase_lower)
            if count > 0:
                keywords.append({
                    'term': phrase,
                    'importance_score': (count * len(phrase.split())) / len(words),
                    'positions': []
                })
        
        # Sort by importance and return top keywords
        keywords.sort(key=lambda k: k['importance_score'], reverse=True)
        return keywords[:10]
    
    def _extract_noun_phrases(self, text: str) -> List[str]:
        """Extract simple noun phrases from text"""
        # Simple pattern for noun phrases (can be improved with proper NLP)
        pattern = r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b'
        phrases = re.findall(pattern, text)
        
        # Filter out common titles
        titles = {'Mr', 'Mrs', 'Dr', 'Ms', 'Prof'}
        phrases = [p for p in phrases if p.split()[0] not in titles]
        
        return phrases
    
    def _build_document_structure(self, chunks: List[Dict], title: str) -> Dict:
        """Build final document structure"""
        # Find root chunk (first chunk with no parent)
        root_chunk = next((c for c in chunks if c['parent_id'] is None), chunks[0])
        
        # Calculate coverage
        total_chars = sum(c['character_count'] for c in chunks)
        
        # Build relationships
        for i, chunk in enumerate(chunks):
            # Find children
            children = [c['id'] for c in chunks if c['parent_id'] == chunk['id']]
            
            # Find siblings
            siblings = [c for c in chunks if c['parent_id'] == chunk['parent_id'] and c['id'] != chunk['id']]
            prev_chunk = None
            next_chunk = None
            
            if siblings:
                # Sort siblings by their order in the chunks list
                siblings.sort(key=lambda c: chunks.index(c))
                current_index = next(j for j, s in enumerate(siblings) if s['id'] == chunk['id'])
                
                if current_index > 0:
                    prev_chunk = siblings[current_index - 1]['id']
                if current_index < len(siblings) - 1:
                    next_chunk = siblings[current_index + 1]['id']
            
            # Add relationships
            chunk['relationships'] = {
                'parent': chunk['parent_id'],
                'children': children,
                'prev': prev_chunk,
                'next': next_chunk,
                'references': [link['target_page_id'] for link in chunk['embedded_links']]
            }
            
            # Generate summary
            chunk['summary'] = self._generate_summary(chunk['content'])
            
            # Add context
            chunk['context'] = f"Part of {title}, section on {chunk['title']}"
            
            # Convert to match expected format
            chunk['parent_page_id'] = chunk.pop('parent_id', None)
        
        document = {
            'document': {
                'id': hashlib.md5(title.encode()).hexdigest()[:8],
                'title': title,
                'total_chunks': len(chunks),
                'root_chunk_id': root_chunk['id'],
                'created_at': '2024-01-01T00:00:00Z',
                'max_depth': max(c['level'] for c in chunks),
                'coverage_percentage': 100.0  # Since we process all content
            },
            'chunks': chunks
        }
        
        return document
    
    def _generate_summary(self, content: str) -> str:
        """Generate a simple summary of the content"""
        sentences = sent_tokenize(content)
        if sentences:
            # Return first sentence as summary (can be improved)
            return sentences[0][:200] + '...' if len(sentences[0]) > 200 else sentences[0]
        return "No summary available"


def main():
    parser = argparse.ArgumentParser(description='Process documents into Coredoc format')
    parser.add_argument('input', help='Input text file path')
    parser.add_argument('-o', '--output', help='Output JSON file path', default='output.json')
    parser.add_argument('-t', '--title', help='Document title', default='Untitled Document')
    
    args = parser.parse_args()
    
    # Read input file
    with open(args.input, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Process document
    processor = CoredocProcessor()
    document = processor.process_text(text, args.title)
    
    # Write output
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(document, f, indent=2)
    
    print(f"Document processed successfully!")
    print(f"Total chunks: {document['document']['total_chunks']}")
    print(f"Output saved to: {args.output}")


if __name__ == '__main__':
    main()