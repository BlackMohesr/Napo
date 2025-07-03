"use client";
import { Button } from "@/components/ui/button";
import { downloadZipFile } from "@/lib/utils";
import { Download } from "lucide-react";

export default function DownloadZipButton({ zipUrl }: { zipUrl: string }) {
    console.log("zipUrl", zipUrl);
  return (
    <Button
      type="button"
      onClick={() => {downloadZipFile(zipUrl)}}
    //     const link = document.createElement("a");
    //     link.href = zipUrl;
    //     link.setAttribute("download", "archive.zip");
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }}
      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white border-blue-600 border rounded px-3 py-2 text-sm"
    >
      <Download className="h-4 w-4 mr-2" />
      Download All (ZIP)
    </Button>
  );
}
