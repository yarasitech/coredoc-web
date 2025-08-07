import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { CoredocDocument } from "@/types/document";

const TEMP_DIR = "/tmp";
const PYTHON_SCRIPT = path.join(process.cwd(), "coredoc-processor", "coredoc.py");

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      // Handle text processing
      const { text, type } = await request.json();
      
      if (type !== "text" || !text) {
        return NextResponse.json(
          { error: "Invalid request" },
          { status: 400 }
        );
      }
      
      // Save text to temporary file
      const tempInputPath = path.join(TEMP_DIR, `input-${Date.now()}.txt`);
      const tempOutputPath = path.join(TEMP_DIR, `output-${Date.now()}.json`);
      
      await writeFile(tempInputPath, text, "utf-8");
      
      // Process with Python script
      const result = await processPythonScript(tempInputPath, tempOutputPath);
      
      // Read output
      const outputContent = await readFile(tempOutputPath, "utf-8");
      const document = JSON.parse(outputContent) as CoredocDocument;
      
      // Cleanup
      await unlink(tempInputPath);
      await unlink(tempOutputPath);
      
      return NextResponse.json({ document });
      
    } else if (contentType?.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const file = formData.get("file") as File;
      
      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }
      
      // Save uploaded file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const tempInputPath = path.join(TEMP_DIR, `upload-${Date.now()}-${file.name}`);
      const tempOutputPath = path.join(TEMP_DIR, `output-${Date.now()}.json`);
      
      await writeFile(tempInputPath, buffer);
      
      // Process based on file type
      let processedText = "";
      
      if (file.name.endsWith(".txt")) {
        processedText = buffer.toString("utf-8");
      } else if (file.name.endsWith(".pdf")) {
        // For demo purposes, we'll just extract text simply
        // In production, use proper PDF parsing
        return NextResponse.json(
          { error: "PDF processing not implemented in demo. Please use TXT files." },
          { status: 400 }
        );
      } else if (file.name.endsWith(".docx")) {
        // For demo purposes, we'll just extract text simply
        // In production, use proper DOCX parsing
        return NextResponse.json(
          { error: "DOCX processing not implemented in demo. Please use TXT files." },
          { status: 400 }
        );
      }
      
      // Save processed text
      await writeFile(tempInputPath, processedText, "utf-8");
      
      // Process with Python script
      const result = await processPythonScript(tempInputPath, tempOutputPath, file.name);
      
      // Read output
      const outputContent = await readFile(tempOutputPath, "utf-8");
      const document = JSON.parse(outputContent) as CoredocDocument;
      
      // Cleanup
      await unlink(tempInputPath);
      await unlink(tempOutputPath);
      
      return NextResponse.json({ document });
    }
    
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
    
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 }
    );
  }
}

function processPythonScript(inputPath: string, outputPath: string, title?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const args = [PYTHON_SCRIPT, inputPath, "-o", outputPath];
    
    if (title) {
      args.push("-t", title);
    }
    
    const pythonProcess = spawn("python3", args);
    
    let stderr = "";
    
    pythonProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${stderr}`));
      } else {
        resolve();
      }
    });
    
    pythonProcess.on("error", (error) => {
      reject(error);
    });
  });
}