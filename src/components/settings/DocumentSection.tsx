import { Button } from "@/src/components/ui/button";
import { FileText } from "lucide-react";

interface Document {
  id: number;
  name: string;
  uploadDate: Date;
}

interface DocumentSectionProps {
  title: string;
  documents: Document[];
  uploadButtonText: string;
}

export function DocumentSection({
  title,
  documents,
  uploadButtonText,
}: DocumentSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between border p-4 rounded-md"
          >
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-gray-400 mr-4" />
              <div>
                <h4 className="font-medium">{doc.name}</h4>
                <p className="text-sm text-gray-500">
                  Uploaded on {doc.uploadDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Download
              </Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        ))}

        <Button className="w-full">{uploadButtonText}</Button>
      </div>
    </div>
  );
}
