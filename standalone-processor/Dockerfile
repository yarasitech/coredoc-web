FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"

# Copy application files
COPY process_folder.py .
COPY index.html .
COPY run.js .

# Create a directory for user documents
RUN mkdir -p /app/documents

# Set the documents directory as volume
VOLUME ["/app/documents"]

# Expose port for web server
EXPOSE 8000

# Default command
CMD ["sh", "-c", "cd /app/documents && python /app/process_folder.py && echo '\n✅ Processing complete! Opening viewer at http://localhost:8000\n' && cd /app && python -m http.server 8000"]