"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { DocumentSection } from "./DocumentSection";

export function DocumentsTab() {
  // Mock data
  const resumes = [1, 2].map((i) => ({
    id: i,
    name: `Resume_${i}.pdf`,
    uploadDate: new Date(),
  }));

  const coverLetters = [
    {
      id: 1,
      name: "Cover_Letter.pdf",
      uploadDate: new Date(),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Documents</CardTitle>
        <CardDescription>
          Manage your resumes and other documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <DocumentSection
            title="Resumes"
            documents={resumes}
            uploadButtonText="Upload New Resume"
          />

          <DocumentSection
            title="Cover Letters"
            documents={coverLetters}
            uploadButtonText="Upload New Cover Letter"
          />
        </div>
      </CardContent>
    </Card>
  );
}
