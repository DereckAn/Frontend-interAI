"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { InterviewItem } from "./InterviewItem";

export function HistoryTab() {
  // Mock data - in a real app this would come from API
  const interviews = [1, 2, 3].map((i) => ({
    id: i,
    title: `Frontend Developer Interview #${i}`,
    date: new Date(),
    score: 85,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview History</CardTitle>
        <CardDescription>View your past interviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview) => (
            <InterviewItem key={interview.id} interview={interview} />
          ))}
          <Button className="w-full">Load More</Button>
        </div>
      </CardContent>
    </Card>
  );
}
