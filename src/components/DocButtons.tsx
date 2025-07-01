"use client";
import { Eye, Download } from "lucide-react";
import { Button } from "./ui/button";
import { OnlineUploadedDocument } from "@/types/applications";

export default function DocButtons({ doc }: { doc: OnlineUploadedDocument }) {
    return (<div className="flex gap-2">
        <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => window.open(doc.downloadURL, '_blank')}
        >
            <Eye className="h-4 w-4" />
        </Button>
        <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => {
                const link = document.createElement('a');
                link.href = doc.downloadURL;
                link.download = doc.fileName;
                link.click();
            }}
        >
            <Download className="h-4 w-4" />
        </Button>
    </div>)
}