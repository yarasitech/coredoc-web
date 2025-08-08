#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = '') {
  console.log(color + message + colors.reset);
}

function checkForTextFiles() {
  const files = fs.readdirSync('.');
  const txtFiles = files.filter(f => f.endsWith('.txt'));
  return txtFiles;
}

async function runPythonScript() {
  return new Promise((resolve, reject) => {
    log('🔄 Processing documents with COREDOC algorithm...', colors.blue);
    
    const python = spawn('python', ['process_folder.py']);
    
    python.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    
    python.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    
    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

function openInBrowser() {
  const indexPath = path.join(__dirname, 'index.html');
  const url = `file://${indexPath}`;
  
  log('\n🌐 Opening viewer in browser...', colors.green);
  
  // Open in default browser based on platform
  const platform = os.platform();
  let command;
  
  if (platform === 'darwin') {
    command = `open "${url}"`;
  } else if (platform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }
  
  require('child_process').exec(command, (error) => {
    if (error) {
      log(`Could not open browser automatically. Please open: ${indexPath}`, colors.yellow);
    }
  });
}

async function main() {
  try {
    log('\n🚀 COREDOC Processor', colors.bright + colors.blue);
    log('===================\n', colors.bright);
    
    // Check for text files
    const txtFiles = checkForTextFiles();
    
    if (txtFiles.length === 0) {
      log('❌ No .txt files found in the current directory.', colors.red);
      log('\n📝 Please add some text files to process:', colors.yellow);
      log('   - Copy your documents here as .txt files');
      log('   - Minimum 1,000 characters per file');
      log('   - Run this script again\n');
      process.exit(1);
    }
    
    log(`📄 Found ${txtFiles.length} text file(s):`, colors.green);
    txtFiles.forEach(file => log(`   - ${file}`));
    log('');
    
    // Run the Python processor
    await runPythonScript();
    
    // Check if any files were processed
    const jsonFiles = fs.readdirSync('.').filter(f => f.endsWith('.coredoc.json'));
    
    if (jsonFiles.length === 0) {
      log('\n⚠️  No documents were processed successfully.', colors.yellow);
      log('   Make sure your text files have at least 1,000 characters.\n');
    } else {
      log(`\n✅ Successfully processed ${jsonFiles.length} document(s)!`, colors.green);
      
      // Open the viewer
      setTimeout(() => {
        openInBrowser();
      }, 1000);
    }
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, colors.red);
    
    if (error.message.includes('Python')) {
      log('\n📦 Please make sure Python is installed and NLTK is available:', colors.yellow);
      log('   pip install nltk\n');
    }
    
    process.exit(1);
  }
}

// Run the script
main();