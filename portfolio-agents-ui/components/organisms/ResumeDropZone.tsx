"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParseResult {
  success: boolean;
  portfolioId?: string;
  slug?: string;
  stats?: {
    pages: number;
    experience_count: number;
    skills_count: number;
    education_count: number;
    projects_count: number;
  };
  error?: string;
}

const ResumeDropZone: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse resume');
      }

      setResult(data);
      
      // Wait 2 seconds to show success, then navigate
      setTimeout(() => {
        router.push(`/voice-agent?portfolioId=${data.portfolioId}`);
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="upload" className="w-full px-4 py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Resume
          </h2>
          <p className="text-gray-600">
            Drop your resume here to get started. We accept PDF files up to 5MB.
          </p>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 md:p-16 transition-all duration-200 cursor-pointer",
            "hover:border-blue-400 hover:bg-blue-50/50",
            isDragActive && "border-blue-500 bg-blue-50",
            file && !result && "border-green-500 bg-green-50/50",
            result?.success && "border-green-500 bg-green-50",
            error && "border-red-500 bg-red-50/50",
            !isDragActive && !file && !result && "border-gray-300 bg-white"
          )}
        >
          <input {...getInputProps()} />
          
          {!file && !result ? (
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
                <span className="px-2 py-1 bg-gray-100 rounded">PDF only</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Max 5MB</span>
              </div>
            </div>
          ) : result?.success ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  Resume Parsed Successfully!
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Found {result.stats?.experience_count} experiences, {result.stats?.skills_count} skills
                </p>
                <p className="text-xs text-gray-500">
                  Redirecting to voice agent setup...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-red-100 rounded-full">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  Parsing Failed
                </p>
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
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

              {!uploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          )}
        </div>

        {file && !result && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={cn(
                "px-8 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2",
                "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                uploading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{uploading ? "Parsing Resume..." : "Parse Resume"}</span>
            </button>
          </div>
        )}

        {uploading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>This may take 15-30 seconds...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeDropZone;