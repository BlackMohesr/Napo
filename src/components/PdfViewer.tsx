"use client";

import { useState, useEffect } from "react";

interface PdfViewerProps {
  url: string;
  fileName: string;
}

export default function PdfViewer({ url, fileName }: PdfViewerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Show a loading placeholder during SSR
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground text-sm">Loading PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <object
        data={url}
        width="100%"
        height="600px"
        type="application/pdf"
        className="w-full h-full"
      >
        <div className="flex items-center justify-center h-full p-4 text-center">
          <div>
            <p className="text-muted-foreground mb-2">
              Your browser does not support PDFs.
            </p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Download PDF
            </a>
          </div>
        </div>
      </object>
    </div>
  );
} 