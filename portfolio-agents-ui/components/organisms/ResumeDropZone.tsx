"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ResumeDropZone: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // TODO: Implement actual upload logic
    setTimeout(() => {
      console.log("Uploading file:", file.name);
      setUploading(false);
      // Navigate to voice agent configuration page
      router.push('/voice-agent');
    }, 2000);
  };

  return (
    <section id="upload" className="w-full px-4 py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Resume
          </h2>
          <p className="text-gray-600">
            Drop your resume here to get started. We accept PDF, DOC, DOCX, and TXT files.
          </p>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 md:p-16 transition-all duration-200 cursor-pointer",
            "hover:border-blue-400 hover:bg-blue-50/50",
            isDragActive && "border-blue-500 bg-blue-50",
            file && "border-green-500 bg-green-50/50",
            !isDragActive && !file && "border-gray-300 bg-white"
          )}
        >
          <input {...getInputProps()} />
          
          {!file ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className={cn(
                "p-4 rounded-full transition-colors",
                isDragActive ? "bg-blue-100" : "bg-gray-100"
              )}>
                <Upload className={cn(
                  "w-12 h-12",
                  isDragActive ? "text-blue-600" : "text-gray-600"
                )} />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                <span className="px-2 py-1 bg-gray-100 rounded">DOC</span>
                <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                <span className="px-2 py-1 bg-gray-100 rounded">TXT</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full">
                <FileText className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={cn(
                "px-8 py-3 font-semibold rounded-lg transition-all duration-200",
                "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                uploading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {uploading ? "Processing..." : "Create My Portfolio"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeDropZone;