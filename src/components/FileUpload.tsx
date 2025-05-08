import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProcessSummary, parseJvmThreadDump } from '../utils/parser.ts';

interface FileUploadProps {
  onDataParsed: (data: ProcessSummary[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataParsed }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const parsedData = parseJvmThreadDump(content);
        onDataParsed(parsedData);
      };
      reader.readAsText(file);
    }
  }, [onDataParsed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt', '.log', '.out', '.output'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-lg text-gray-600">Drop the file here...</p>
      ) : (
        <div>
          <p className="text-lg text-gray-600">
            Drag and drop a JVM thread dump file here, or click to select
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: .txt, .log, .out, .output
          </p>
        </div>
      )}
    </div>
  );
}; 